const { cache } = require('jsxstyle');

let styles = '';

cache.injectOptions({
  onInsertRule: rule => {
    styles += rule + '\n';
  },
  pretty: true,
});

function createSerializer(injector) {
  function test(val) {
    return (
      val && !val.withStyles && val.$$typeof === Symbol.for('react.test.json')
    );
  }

  function print(val, serialize) {
    val.withStyles = true;

    const stylesToPrint = styles === '' ? styles : `${styles}\n\n`;
    styles = '';

    const prettyPrinted = `${stylesToPrint}${serialize(val)}`;

    cache.reset();
    return prettyPrinted;
  }

  return { test, print };
}

// doing this to make it easier for users to mock things
// like switching between development mode and whatnot.
const jsxstyle = createSerializer();
createSerializer.test = jsxstyle.test;
createSerializer.print = jsxstyle.print;

module.exports = createSerializer;
