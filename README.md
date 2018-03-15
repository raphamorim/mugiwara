<h2 dir='rtl' align='right'>Mugiwara</h2>
<p dir='rtl' align='right'>麦わら帽子</p>

> Mugiwara is a blazing fast minimal CSS-in-JS

## Installing

```bash
yarn install mugiwara
```

## Using it

Example with ReactJS:

```jsx
import React from 'react'
import { createStyle } from 'mugiwara'

const style = createStyle({
  padding: '32px',
  backgroundColor: 'green'
})

const Box = (props) => <div {...props} style={style} />

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
