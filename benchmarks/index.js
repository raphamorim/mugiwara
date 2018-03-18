const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

// benchmark hates browser-env
require('browser-env')()
require("babel-register")

const cxs = require('./lib/cxs')
const mugiwara = require('./lib/mugiwara')
const fela = require('./lib/fela')
// const styledComponents = require('./lib/styled-components')
const glamor = require('./lib/glamor')
const inlineStyles = require('./lib/inline-styles')
// const emotion = require('./lib/emotion')

suite
  // .add('inline-styles', inlineStyles)
  .add('cxs', cxs)
  .add('fela', fela)
  .add('mugiwara', mugiwara)
  // .add('emotion', emotion)
  .add('glamor', glamor)
  // .add('styled-components', styledComponents)
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function () {
    const top = this.filter('fastest').map('name')
    console.log(`Fastest is ${top}`)
  })
  .on('error', function (error) {
    console.log(error)
  })
  .run({
    async: true
  })

