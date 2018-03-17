<h2 dir='rtl' align='right'>Mugiwara</h2>
<p dir='rtl' align='right'>麦わら帽子</p>

> Mugiwara is an another fast minimal CSS-in-JS created to reduce size of CSS injected

Mugiwara uses similar [Virtual CSS concept to reduce bundle](https://ryantsao.com/blog/virtual-css-with-styletron) however using a preemption algorithm behind, called as `Chained CSS`.

## How `Chained CSS` works?


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

## TODO

- [ ] Support MediaQueries
- [ ] Server Side Renderer
