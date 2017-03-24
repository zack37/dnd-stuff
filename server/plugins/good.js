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
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  }
});
