export default function patchCjs() {
  return {
    name: 'patch-cjs',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('node_modules') && !id.includes('esm-') && code.includes('module.exports =')) {
        if (!code.includes('module.exports.default =')) {
          return {
            code: code + '\nmodule.exports.default = module.exports;',
            map: null
          };
        }
      }
      return null;
    }
  };
}
