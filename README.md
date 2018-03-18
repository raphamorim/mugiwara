<h2 dir='rtl' align='right'>Mugiwara</h2>
<p dir='rtl' align='right'>麦わら帽子</p>

> Mugiwara is a fast minimal CSS-in-JS created to reduce size of CSS injected

Mugiwara uses similar [Virtual CSS concept to reduce bundle](https://ryantsao.com/blog/virtual-css-with-styletron) however using a preemption algorithm behind, called as [Chain CSS](#how-chain-css-works). On `1.2KB` (gzipped).

[![CircleCI branch](https://img.shields.io/circleci/project/github/raphamorim/mugiwara/master.svg?style=for-the-badge)](https://circleci.com/gh/raphamorim/mugiwara) [![NPM Version](https://img.shields.io/npm/v/mugiwara.svg?style=for-the-badge)](https://npmjs.com/package/mugiwara)

**Status**: Under development. Don't use it in Production.

#### Benchmark

```bash
cxs x 31,955 ops/sec ±5.10% (85 runs sampled)
fela x 29,790 ops/sec ±0.93% (85 runs sampled)
mugiwara x 33,806 ops/sec ±0.96% (86 runs sampled)
glamor x 25,009 ops/sec ±1.34% (85 runs sampled)
Fastest is mugiwara
✨  Done in 27.38s.
```

#### Principles:

- Transform declarations in Shallow way

Browsers read selectors from right to left. The deeper the selectors are, the longer it takes for the browser to render and re-render the elements those selectors are applied to. For complex DOMs that reflow often, short selectors can also cut down on jank. 

Good to read: [Efficiently Rendering CSS](https://css-tricks.com/efficiently-rendering-css/)

- Prehemption

Feature not available yet, soon more details.

- Remove redundances

Good to read: [Remove Unused CSS to Reduce the Size of your Stylesheets](https://www.labnol.org/internet/remove-unused-css/28635/)

#### How Chain CSS works?

Algorithm still in development, here's a preview of first step:

```jsx

Element A -> {color: 'blue', padding: '10px', fontFamily: 'Helvetica'}
Element B -> {color: 'red', borderRight: '1px solid #333'}
Element C -> {padding: 10, fontFamily: 'Helvetica'}

Result:

.A { 
  color: blue 
}
.A, .C { 
  padding: '10px', 
  fontFamily: 'Helvetica' 
}
.B { 
  border-right: '1px solid #333' 
}

````

## Installing

```bash
yarn add mugiwara
```

## Using it

Example with ReactJS:

```jsx
import React from 'react'
import { render } from 'react-dom'
import { createClass, createStyles } from 'mugiwara'

const className = createClass({
  padding: 32,
  backgroundColor: 'green'
})

const Box = (props) => <div {...props} className={className} />

createStyles()

render(Box, document.querySelector('#root'))
```

Also valid API (still in draft):

```jsx
const className = createClass(`
  position: 'abolute',
  padding: 32px,
  backgroundColor: 'green'

  & div {
    width: 100px;
  }
`)
```

Example with ReactJS Server side-render:

```jsx
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { shallowStyles } from 'mugiwara'
import App from './App'

const renderedApp = ReactDOMServer.renderToString(<App />)
const staticPage = `
<html>
  <style>${shallowStyles()}</style>
  ${renderedApp}
</html>
`

console.log(staticPage)
/*
<html>
  <style>.app{position:absolute;display:flex;margin:0 auto;}.heading{font-family:Helvetica, arial;}</style>
  <div class="app" data-reactroot=""><div class="heading">MyApp</div></div>
</html>
*/
```

## 1.x ROADMAP

- [ ] Support pseudo-selectors
- [ ] Support to prefix
- [ ] Check similar properties (e.g: `#FFF`, `white`) and keep one
- [ ] Support MediaQueries
- [x] Support Server Side Renderer
- [ ] Cache features
- [ ] Support React Native Style (using [native-css](https://github.com/raphamorim/native-css))

## Reference

- https://www.creativebloq.com/how-to/5-tips-for-super-fast-css
- https://ryantsao.com/blog/virtual-css-with-styletron
