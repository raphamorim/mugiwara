var input1 = {
  color: 1,
  background: 2,
  fontSize: 3
}

var input2 = {
  color: 2,
  background: 2
}

var input3 = {
  color: 1,
  fontSize: 3
}

const rules = [];

function normalize() {
  rules.forEach((className) => {
    // transformedClassNames[className] = rules.filter(rule => rule.className === className)
  })
}



function createClass(style) {
  const className = '.mw-' + Math.random().toString(36).substring(7);
  if (!rules[className]) {
    rules[className] = {};
  }

  Object.keys(style).forEach((property) => {
    rules[className][property] = style[property]
  });

  normalize();

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

transform()

console.log(rules)
