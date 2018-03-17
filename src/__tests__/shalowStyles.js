import { createClass, shallowStyles, clearStyles } from '../index.js';

describe('shallowStyles', () => {
  beforeEach(() => {
    clearStyles()
  })

  it('should shallowStyles return valid css string', () => {
    const classname = createClass({
      border: '1px solid blue',
      height: '49px',
      top: 0,
      position: 'absolute',
      display: 'flex'
    })

    const styles = shallowStyles()

    expect(styles).toContain('.mw-');
    expect(styles).toContain('{border:1px solid blue;height:49px;top:0;position:absolute;display:flex;}');
  })

  it('should shallowStyles remove prefix', () => {
    const classname = createClass({
      mozBoxShadow: '10px 35px 1px blue',
      boxShadow: '10px 35px 1px blue',
    })

    const styles = shallowStyles()

    expect(styles).toContain('.mw-');
    expect(styles).toContain('{moz-box-shadow: }');
  })
})
