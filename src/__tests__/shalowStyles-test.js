import {createClass, shallowStyles, clearStyles} from '../index.js';

describe('shallowStyles', () => {
  beforeEach(() => {
    clearStyles();
  });

  it('should shallowStyles return valid css string', () => {
    createClass({
      border: '1px solid blue',
      height: '49px',
      top: 0,
      position: 'absolute',
      display: 'flex',
    });

    const styles = shallowStyles();

    expect(styles).toContain('.mw-');
    expect(styles).toContain(
      '{border:1px solid blue;height:49px;top:0;position:absolute;display:flex;}'
    );
  });

  // TODO: support browser prefix when asked
  it('should shallowStyles add prefix', () => {
    createClass({
      mozBoxShadow: '10px 35px 1px blue',
      boxShadow: '10px 35px 1px blue',
    });

    const styles = shallowStyles();

    expect(styles).toContain('.mw-');
    expect(styles).toContain(
      '{moz-box-shadow:10px 35px 1px blue;box-shadow:10px 35px 1px blue;}'
    );
  });

  it('should shallowStyles remove redundances', () => {
    createClass('header', {
      color: '#333',
      background: '#F9F9F9',
      fontSize: '20px',
    });

    createClass('wrapper', {
      color: '#f8f8f8',
      background: 'blue',
      borderRigth: '1px solid #333',
    });

    createClass('my-other-wrapper', {
      color: '#333',
      fontSize: '15px',
      position: 'absolute',
    });

    const styles = shallowStyles();

    expect(styles).toEqual(
      '.header,.my-other-wrapper{color:#333;}.header{background:#F9F9F9;font-size:20px;}.wrapper{color:#f8f8f8;background:blue;border-rigth:1px solid #333;}.my-other-wrapper{font-size:15px;position:absolute;}'
    );
  });

  it('should shallowStyles remove redundances', () => {
    createClass('header', {
      color: '#333',
      background: '#F9F9F9',
      fontSize: '20px',
    });

    createClass('wrapper', {
      color: '#f8f8f8',
      background: 'blue',
      borderRigth: '1px solid #333',
    });

    createClass('my-other-wrapper', {
      color: '#333',
      fontSize: '15px',
      position: 'absolute',
    });

    const styles = shallowStyles();

    expect(styles).toEqual(
      '.header,.my-other-wrapper{color:#333;}.header{background:#F9F9F9;font-size:20px;}.wrapper{color:#f8f8f8;background:blue;border-rigth:1px solid #333;}.my-other-wrapper{font-size:15px;position:absolute;}'
    );
  });
});
