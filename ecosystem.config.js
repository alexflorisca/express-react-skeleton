module.exports = {
  apps : [{
    name: 'Express React App',
    script: 'dist/server',
    args: '',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
  }]
};
