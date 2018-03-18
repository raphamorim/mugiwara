import {createClass, createStyles, clearStyles} from '../index.js';

function getComputedStyle(element, prop) {
  if (element.currentStyle) {
    return element.currentStyle[prop];
  } else if (
    window.getComputedStyle &&
    window.getComputedStyle(element, null)
  ) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
  } else {
    return element.style[prop];
  }
}

describe('injectStyle', () => {
  beforeEach(() => {
    clearStyles();
  });

  it('should inject stylesheet rules on document', () => {
    createClass('first-stylesheet', {
      height: '49px',
      top: '10px',
      position: 'absolute',
      display: 'flex',
    });

    createClass('second-stylesheet', {
      left: '15px',
      top: '20px',
    });

    createStyles();

    const myElement = document.createElement('div');
    myElement.classList.add('first-stylesheet');
    document.body.appendChild(myElement);

    const mySecondElement = document.createElement('div');
    mySecondElement.classList.add('second-stylesheet');
    myElement.appendChild(mySecondElement);

    expect(getComputedStyle(myElement, 'height')).toEqual('49px');
    expect(getComputedStyle(myElement, 'top')).toEqual('10px');
    expect(getComputedStyle(myElement, 'display')).toEqual('flex');

    expect(getComputedStyle(mySecondElement, 'left')).toEqual('15px');
    expect(getComputedStyle(mySecondElement, 'top')).toEqual('20px');
  });
});
