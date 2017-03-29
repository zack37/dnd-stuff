export default () => ({
  plugin: {
    register: 'good',
    options: {
      ops: { interval: 1000 },
      reporters: {
        consoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', error: '*' }]
          },
          {
            module: 'good-console',
            args: [{
              format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }]
          },
          'stdout'
        ]
      }
    }
  }
});
