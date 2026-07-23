module.exports = {
  apps: [
    {
      name: 'sqs-security-ssr',
      script: './dist/server/entry.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        HOST: '127.0.0.1',
        PORT: 4321,
        NODE_ENV: 'production'
      }
    }
  ]
};
