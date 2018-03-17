import { createClass, shallowStyles, clearStyles } from '../index.js';

describe('shallowStyles', () => {
  it('should shallowStyles return valid string', () => {
    clearStyles()

    const classname = createClass({
      border: '1px solid blue',
      height: '49px',
      top: 0,
      position: 'absolute',
      display: 'flex'
    })

    const styles = shallowStyles()

    expect(styles).toContain('mw-');
    expect(styles).toContain('{border:1px solid blue;height:49px;top:0;position:absolute;display:flex;}');
  })
})
