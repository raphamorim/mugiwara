import memoize from 'fast-memoize';
import injectStyle from './injectStyle';

let rules = [];
let transformedRules = {};

const hyphenate = memoize(hyphenateStyleName);
const markup = memoize(createMarkup);
const transform = memoize(transformRules);

function hyphenateStyleName(string) {
  const uppercasePattern = /[A-Z]/g;
  const msPattern = /^ms-/;

  return string
    .replace(uppercasePattern, '-$&')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

function createMarkup(obj) {
  const keys = Object.keys(obj);
  if (!keys.length) return '';
  let i,
    len = keys.length;
  let result = '';

  for (i = 0; i < len; i++) {
    const key = keys[i];
    let val = obj[key];
    if (typeof val === 'object') {
      val = `{${markup(val)}}`;
      result += key + val;
    } else {
      result += key + ':' + val + ';';
    }
  }

  return result;
}

function mountCSS(styles, className) {
  if (transformedRules[className]) {
    transformedRules[className][styles[0].property] = styles[0].value;
  } else {
    let obj = {};
    obj[styles[0].property] = styles[0].value;
    transformedRules[className] = obj;
  }
}

function transformRules(_rules) {
  if (_rules.length && _rules[0]) {
    let matches = [];
    let classNames = [];

    const newRules = _rules.filter(filteredRule => {
      if (
        filteredRule.value === _rules[0].value &&
        filteredRule.property === _rules[0].property
      ) {
        matches.push(filteredRule);
        classNames.push(filteredRule.className);
      } else {
        return filteredRule;
      }
    });

    mountCSS(matches, classNames.join(','));
    return transform(newRules);
  }
}

function checkParams(styleOrClassName, style) {
  let className, styleKeys, styleRules;

  if (typeof styleOrClassName === 'object') {
    className =
      '.mw-' +
      Math.random()
        .toString(36)
        .substring(7);
    styleKeys = Object.keys(styleOrClassName);
    styleRules = styleOrClassName;
  } else if (
    typeof styleOrClassName === 'string' &&
    typeof style === 'object'
  ) {
    className = '.' + styleOrClassName;
    styleKeys = Object.keys(style);
    styleRules = style;
  }

  return {
    className,
    styleRules,
    styleKeys,
  };
}

const checkParamsMemo = memoize(checkParams);

function createClassFN(styleOrClassName, style) {
  const {className, styleKeys, styleRules} = checkParamsMemo(
    styleOrClassName,
    style
  );

  if (!className) {
    return false;
  }

  styleKeys.forEach(property => {
    rules.push({
      property: hyphenate(property),
      value: styleRules[property],
      className: className,
    });
  });

  return className.replace('.', '');
}

function generate() {
  transform(rules);
  const generatedCSS = markup(transformedRules);

  injectStyle(generatedCSS);
  return generatedCSS;
}

function createStylesFN() {
  transform(rules);
  const generatedCSS = markup(transformedRules);

  injectStyle(generatedCSS);
}

export const createStyles = memoize(createStylesFN);
export const createClass = createClassFN;
export const shallowStyles = generate;
export function clearStyles() {
  rules = [];
  transformedRules = {};
}
