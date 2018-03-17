import { createStyle } from '../createStyle.js';

describe('createStyle', () => {
  it('should renderer to expected Element', () => {
    expect(createStyle({
      border: '1px solid blue',
      height: 49
    })).toEqual(`{border: 1}`);
  })
})
