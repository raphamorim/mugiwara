const h = require('react').createElement
const { render } = require('react-dom')
const { createRenderer } = require('fela')

const app = document.createElement('div')

module.exports = () => {
  const renderer = createRenderer()

  const rule = state => ({
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

  const className = renderer.renderRule(rule, {
    primary: true
  })

  const button = render(
    h('button', { className: className }, 'Hello'),
    app
  )
}
