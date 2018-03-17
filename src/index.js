import memoize from 'fast-memoize'
import injectStyle from './injectStyle'

let rules = []
let transformedRules = {}
const cache = {}

function hyphenateStyleName(string) {
  const uppercasePattern = /[A-Z]/g;
  const msPattern = /^ms-/;

  return string in cache
  ? cache[string]
  : cache[string] = string
    .replace(uppercasePattern, '-$&')
    .toLowerCase()
    .replace(msPattern, '-ms-')
}

const hyphenate = memoize(hyphenateStyleName)

function createMarkup(obj) {
  const keys = Object.keys(obj)
  if (!keys.length) return ''
  let i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    const key = keys[i]
    let val = obj[key]
    if (typeof val === 'object') {
      val = `{${createMarkup(val)}}`
      result += hyphenate(key) + val
    } else {
      result += hyphenate(key) + ':' + val + ';'
    }
  }

  return result
}

const markup = memoize(createMarkup)

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

function createClassFN(style) {
  const className = '.mw-' + Math.random().toString(36).substring(7);
  Object.keys(style).forEach((property) => {
    rules.push({
      property: property,
      value: style[property],
      className: className,
    })
  })

  return className
}

function generate() {
  transform(rules)
  const generatedCSS = markup(transformedRules)

  injectStyle(generatedCSS)
  return generatedCSS
}

export const createClass = memoize(createClassFN)
export const shallowStyles = generate
export function clearStyles() {
  rules = []
  transformedRules = {}
}

