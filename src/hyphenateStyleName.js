import memoize from 'fast-memoize';

function hyphenateStyleName(string) {
  const uppercasePattern = /[A-Z]/g;

  return string.replace(uppercasePattern, '-$&').toLowerCase();
}

export default memoize(hyphenateStyleName);
