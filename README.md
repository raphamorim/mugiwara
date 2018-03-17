<h2 dir='rtl' align='right'>Mugiwara</h2>
<p dir='rtl' align='right'>麦わら帽子</p>

> Mugiwara is an another fast minimal CSS-in-JS created to Reduce Size of injected CSS

Mugiwara is a work in progress.

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
- [ ] 
