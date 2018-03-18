const h = require('react').createElement
const { render } = require('react-dom')
const cxs = require('cxs')

const app = document.createElement('div')

module.exports = () => {
  const ButtonClass = cxs({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: 16,
    border: 0,
    borderRadius: 4,
    color: 'white',
    appearance: 'none',
  })

  const button = render(
    h('button', { className: ButtonClass }, 'Hello'),
    app
  )
}
