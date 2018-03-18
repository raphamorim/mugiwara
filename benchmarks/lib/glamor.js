const h = require('react').createElement
const { render } = require('react-dom')
const glamor = require('glamor')

const app = document.createElement('div')

module.exports = () => {
  const ButtonClass = glamor.css({
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
