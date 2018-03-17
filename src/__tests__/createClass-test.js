import { createClass } from '../index.js';

describe('createClass', () => {
  it('should create custom classname', () => {
    const classname = createClass('myClass', {
      color: 'blue'
    })

    expect(classname).toEqual('myClass');
  })

  it('should classname use mw- as prefix', () => {
    const classname = createClass({
      border: '1px solid blue',
    })

    expect(classname).toContain('mw-');
  })
})
