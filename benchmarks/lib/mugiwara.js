const h = require('react').createElement
const { render } = require('react-dom')
const { createClass, createStyles } = require('../../dist/mugiwara.umd.js')

const app = document.createElement('div')

module.exports = () => {
  const ButtonClassName = createClass('button', {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: '16px',
    border: 0,
    borderRadius: '4px',
    color: 'white',
    appearance: 'none',
  })

  const button = render(
    h('button', { className: ButtonClassName }, 'Hello'),
    app
  )

  createStyles()
}
