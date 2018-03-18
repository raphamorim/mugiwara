import {createClass, createStyles, clearStyles} from '../index.js';

describe('injectStyle', () => {
  beforeEach(() => {
    clearStyles();
  });

  it('should inject stylesheet rules on document', () => {
    createClass('my-stylesheet', {
      height: '49px',
      top: '10px',
      position: 'absolute',
      display: 'flex',
    });

    createStyles();

    const myElement = document.createElement('div');
    myElement.classList.add('my-stylesheet');

    document.body.appendChild(myElement);
    const computedStyle = window.getComputedStyle(myElement);

    expect(computedStyle.getPropertyValue('height')).toEqual('49px');
    expect(computedStyle.getPropertyValue('top')).toEqual('10px');
    expect(computedStyle.getPropertyValue('display')).toEqual('flex');
  });
});
