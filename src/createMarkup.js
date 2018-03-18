import memoize from 'fast-memoize';

const markup = memoize(createMarkup);

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

export default markup;
