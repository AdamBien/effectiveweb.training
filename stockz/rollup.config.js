const views = ['AboutView', 'AddView', 'AirElement', 'ListView', 'Overview', 'Stocks', 'TotalView'].map(view => `src/views/${view}.js`);

export default [{
    input: 'src/app.js',
    output: {
      file: 'dist/app.js',
      format: 'esm'
    }
  }, {
    input: views,
    output: 
      {
        dir: 'dist/views',
        format: 'esm'
        },
    experimentalCodeSplitting: true
}];