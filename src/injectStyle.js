const injectStyle = style => {
  const styleElement = document.createElement('style');
  let styleSheet = document.createTextNode('');

  document.head.appendChild(styleElement);

  sheetSheet = styleElement.sheet;
  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

export default injectStyle;
