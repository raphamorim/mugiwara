import { createClass } from '../index.js';

describe('createClass', () => {
  it('should classname use mw- as prefix', () => {
    const classname = createClass({
      border: '1px solid blue',
      height: 49
    })

    expect(classname).toContain('mw-');
  })
})
