function createClass(styleObject) {


}

function _toCss(obj, level) {
    var str = '';
    Object.keys(obj).forEach(function (sel) {
      var value = obj[sel];
      if (isLastLevel(value)) {
        str += rule(props(sel, value), values(value, sel), opts.indent, level - 1);
        return;
      } else if (Array.isArray(value)) {
        value.forEach(function (val) {
          str += _toCss(nest(sel, val), level);
        });
        return;
      }
      selectors(sel, value).forEach(function (selector) {
        str += start(selector, opts.indent, level);
        Object.keys(value).forEach(function (prop) {
          var value = obj[sel][prop];
          if (oneMoreLevelExists(value)) {
            str += _toCss(nest(prop, value), level + 1);
          } else {
            str += rule(props(prop, value), values(value, prop), opts.indent, level);
          }
        });
        str += end(opts.indent, level);
      });
    });
    return str;
  }


export default createClass
