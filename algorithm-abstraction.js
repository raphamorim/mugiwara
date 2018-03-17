console.time('ended with')

var input1 = {
  color: '#333',
  background: '#F9F9F9',
  fontSize: 20
}

var input2 = {
  color: '#f8f8f8',
  background: 'blue',
  borderRigth: '1px solid #333'
}

var input3 = {
  color: '#333',
  fontSize: '15px',
  position: 'absolute'
}

const rules = [];
const transformedRules = {};
const cache = {};

function hyphenateStyleName(string) {
  const uppercasePattern = /[A-Z]/g;
  const msPattern = /^ms-/;

  return string in cache
  ? cache[string]
  : cache[string] = string
    .replace(uppercasePattern, '-$&')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

function createMarkup(obj) {
  var keys = Object.keys(obj)
  if (!keys.length) return ''
  var i, len = keys.length
  var result = ''

  for (i = 0; i < len; i++) {
    var key = keys[i]
    var val = obj[key]
    if (typeof val === 'object') {
      val = `{${createMarkup(val)}}`
      result += hyphenateStyleName(key) + val
    } else {
      result += hyphenateStyleName(key) + ':' + val + ';'
    }
  }

  return result
}

function mountCSS(styles, className) {
  if (transformedRules[className]) {
    transformedRules[className][styles[0].property] = styles[0].value
  } else {
    let obj = {}
    obj[styles[0].property] = styles[0].value
    transformedRules[className] = obj
  }
}

function transform(rules) {
  if (rules.length && rules[0]) {
    let matches = []
    let classNames = []

    const newRules = rules.filter((filteredRule) => {
      if (filteredRule.value === rules[0].value &&
      filteredRule.property === rules[0].property) {
        matches.push(filteredRule)
        classNames.push(filteredRule.className)
      } else {
        return filteredRule
      }
    })

    mountCSS(matches, classNames.join(','))
    return transform(newRules)
  }
}

function createClass(style) {
  const className = '.mw-' + Math.random().toString(36).substring(7);
  Object.keys(style).forEach((property) => {
    rules.push({
      property: property,
      value: style[property],
      className: className,
    })
  });

  return className;
}

createClass(input1)
createClass(input2)
createClass(input3)

transform(rules)

console.log(createMarkup(transformedRules))
console.timeEnd('ended with')
