const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let attempts = 0;
while (attempts < 50) {
  try {
    console.log(`Attempt ${attempts + 1}: Running build...`);
    execSync('npx astro build', { stdio: 'pipe' });
    console.log('Build succeeded!');
    break;
  } catch (err) {
    const output = (err.stderr ? err.stderr.toString() : '') + (err.stdout ? err.stdout.toString() : '');
    const match = output.match(/not exported by "(.+?)"/);
    if (match) {
      const failingFile = match[1];
      console.log('Failing file:', failingFile);
      
      if (failingFile.includes('_original')) {
        console.error('Original file itself failed, stopping to prevent infinite loop.');
        break;
      }
      
      const ext = path.extname(failingFile);
      const dir = path.dirname(failingFile);
      const base = path.basename(failingFile, ext);
      const originalFile = path.join(dir, `${base}_original${ext}`);
      
      if (!fs.existsSync(originalFile)) {
        // Rename original file
        fs.renameSync(failingFile, originalFile);
        
        let keys = [];
        try {
          const absolutePath = path.resolve(originalFile);
          const cjs = require(absolutePath);
          if (cjs && (typeof cjs === 'object' || typeof cjs === 'function')) {
            keys = Object.keys(cjs).filter(k => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k));
          }
        } catch (e) {
          console.error('Failed to require CJS module for keys:', e);
        }
        
        let esmCode = `if (typeof globalThis !== 'undefined' && !('module' in globalThis)) { globalThis.module = undefined; }\nimport * as mod from './${base}_original${ext}';\nexport default mod.default || mod;\n`;
        for (const key of keys) {
          if (key !== 'default') {
            esmCode += `export const ${key} = mod.${key};\n`;
          }
        }
        
        fs.writeFileSync(failingFile, esmCode);
        console.log(`Patched ${failingFile}`);
      } else {
        console.error(`Original file already exists at ${originalFile}, but build still failed on it.`);
        break;
      }
    } else {
      console.error('Build failed for unknown reason:');
      console.error(output.substring(0, 1000));
      break;
    }
    attempts++;
  }
}
