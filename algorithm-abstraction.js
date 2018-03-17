console.time('ended with')

var input1 = {
  color: 1,
  background: 4,
  fontSize: 3
}

var input2 = {
  color: 1,
  background: 2
}

var input3 = {
  color: 2,
  fontSize: 5
}

const rules = [];
const transformedRules = {};

function mountCSS(styles, className) {
  let obj = {}
  obj[styles[0].property] = styles[0].value
  transformedRules[className] = obj
}

function transform(rules) {
  if (rules.length && rules[0]) {
    let matches = []
    let classNames = ''

    const newRules = rules.filter((filteredRule) => {
      if (filteredRule.value === rules[0].value &&
      filteredRule.property === rules[0].property) {
        matches.push(filteredRule)
        classNames += filteredRule.className + ' '
      } else {
        return filteredRule
      }
    })

    mountCSS(matches, classNames.trim())
    return transform(newRules)
  }
}

function createClass(style) {
  const className = '.mw-' + Math.random().toString(36).substring(7);
  Object.keys(style).forEach((property) => {
    rules.push({property: property, value: style[property], className: className})
  });

  return className;
}

// should create
/*
{
  '.mw-xxx': { la: 1, be: 2, io: 3 },
  '.mw-yyy': { la: 2, be: 2 },
  '.mw-www': { ac: 1, io: 3 } }
*/

createClass(input1)
createClass(input2)
createClass(input3)

transform(rules)

console.log(transformedRules)

console.timeEnd('ended with')

// console.log(rules)
