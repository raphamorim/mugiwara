import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { shallowStyles, createClass, clearStyles } from '../index'

describe('server-side-renderer', () => {
  beforeEach(() => {
    clearStyles()
  })

  it('should shallow a valid css string', () => {
    const AppClassName = createClass('app', {
      position: 'absolute',
      display: 'flex',
      margin: '0 auto',
    })

    const HeadingClassName = createClass('heading', {
      fontFamily: 'Helvetica, arial'
    })

    const App = () => (
      <div className={AppClassName}>
        <div className={HeadingClassName}>MyApp</div>
      </div>
    )
    const html = ReactDOMServer.renderToString(<App />)

    const doc = `
      <html>
      <style>${shallowStyles()}</style>
      ${html}
      </html>`

    // clear cached styles
    clearStyles()

    expect(doc).toEqual(`
      <html>
      <style>.app{position:absolute;display:flex;margin:0 auto;}.heading{font-family:Helvetica, arial;}</style>
      <div class="app" data-reactroot=""><div class="heading">MyApp</div></div>
      </html>`);
  })
})
