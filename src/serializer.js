const { cache } = require('jsxstyle');

let styles = '';

cache.injectOptions({
  onInsertRule: rule => {
    styles += rule + '\n';
  },
  pretty: true
})

function createSerializer(injector) {
  function test(val) {
    return (
      val && !val.withStyles && val.$$typeof === Symbol.for('react.test.json')
    );
  }

  function print(val, printer) {
    val.withStyles = true;

    const prettyPrinted = `${styles}\n\n${printer(val)}`;

    styles = '';
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
