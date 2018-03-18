import memoize from 'fast-memoize';

let lastStyle = '';

const injectStyle = style => {
  if (!style || !style.length || style === lastStyle) {
    return false;
  }

  const styleElement = document.createElement('style');
  let styleSheet = '';

  lastStyle = style;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;
  style = style.slice(1);
  const arrRules = style.split('}.');

  for (let i = 0; i < arrRules.length - 1; i++) {
    styleSheet.insertRule('.' + arrRules[i] + '}', styleSheet.cssRules.length);
  }

  styleSheet.insertRule(
    '.' + arrRules[arrRules.length - 1],
    styleSheet.cssRules.length
  );
};

const inject = memoize(injectStyle);

export default inject;
