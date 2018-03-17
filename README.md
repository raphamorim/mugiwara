<h2 dir='rtl' align='right'>Mugiwara</h2>
<p dir='rtl' align='right'>麦わら帽子</p>

> Mugiwara is a fast minimal CSS-in-JS created to reduce size of CSS injected

[WORK IN PROGRESS, NOTHING TO SEE HERE YET]

Mugiwara uses similar [Virtual CSS concept to reduce bundle](https://ryantsao.com/blog/virtual-css-with-styletron) however using a preemption algorithm behind, called as [Chain CSS](#how-chain-css-works).

#### Principles:

- Transform declarations in Shallow way

Browsers read selectors from right to left. The deeper the selectors are, the longer it takes for the browser to render and re-render the elements those selectors are applied to. For complex DOMs that reflow often, short selectors can also cut down on jank. 

Good to read: [Efficiently Rendering CSS](https://css-tricks.com/efficiently-rendering-css/)

- Prehemption

Soon more details

- Remove redundances

#### How Chain CSS works?

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
import { createClass } from 'mugiwara'

const className = createClass({
  padding: 32,
  backgroundColor: 'green'
})

const Box = (props) => <div {...props} className={className} />

export default Box
```

Also valid API: 

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
import { styles } from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)

const doc = `
  <html>
    <style>${styles}</style>
    ${html}
  </html>
`
```

## ROADMAP

- [ ] Support pseudo-selectors
- [ ] Check similar properties (e.g: `#FFF`, `white`) and keep one
- [ ] Support MediaQueries
- [ ] Support Server Side Renderer
- [ ] Cache features
- [ ] Support React Native Style (using [native-css](https://github.com/raphamorim/native-css))

## Reference

- https://www.creativebloq.com/how-to/5-tips-for-super-fast-css
- https://ryantsao.com/blog/virtual-css-with-styletron
