# jest-jsxstyle

Jest utilities for jsxstyle

## The problem

If you use [`jsxstyle`](https://github.com/smyte/jsxstyle) as your CSS-in-JS solution, and you use
[snapshot testing][snapshot] with [jest][jest] then you probably have some test
snapshots that look like:

```html
<h1
  class="jsxstyle-0"
>
  Hello World
</h1>
```

And that's not super helpful from a styling perspective. Especially when there
are changes to the class, you can see that it changed, but you have to look
through the code to know _what_ caused the class name to change.

## This solution

This allows your snapshots to look more like:

```html
._15clmrq {
  color:red;
  display:block;
}

<h1
  class="_15clmrq"
>
  Hello World
</h1>
```

This is much more helpful because now you can see the CSS applied and over time
it becomes even more helpful to see how that changes over time.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev jest-jsxstyle
```

## Usage

At the top of your test file:

```javascript
import serializer from 'jest-jsxstyle'

expect.addSnapshotSerializer(serializer)
```

Or in your Jest serializer config:

```javascript
{
  "snapshotSerializers": [
    "jest-jsxstyle"
  ]
}
```

And here's how we'd test them with `react-test-renderer`:

```javascript
import React from 'react'
import renderer from 'react-test-renderer'

test('react-test-renderer', () => {
  const tree = renderer
    .create(
      <Block color="orange">
        <Block margin="4rem">
          Hello World, this is my first jsxstyle component!
        </Block>
      </Block>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
```

Works with enzyme too:

```javascript
import * as enzyme from 'enzyme'
import toJson from 'enzyme-to-json'

test('enzyme', () => {
  const ui = (
    <Block color="orange">
      <Block margin="4rem">
        Hello World, this is my first jsxstyle component!
      </Block>
    </Block>
  )

  expect(toJson(enzyme.shallow(ui))).toMatchSnapshot(`enzyme.shallow`)
  expect(toJson(enzyme.mount(ui))).toMatchSnapshot(`enzyme.mount`)
  expect(toJson(enzyme.render(ui))).toMatchSnapshot(`enzyme.render`)
})
```

# Inspiration

- [`jest-styled-components`](https://github.com/styled-components/jest-styled-components)
- [`jest-glamor-react`](https://github.com/kentcdodds/jest-glamor-react)



## LICENSE

MIT

[glamor]: https://www.npmjs.com/package/glamor
[snapshot]: http://facebook.github.io/jest/docs/snapshot-testing.html
[jest]: http://facebook.github.io/jest/
[MicheleBertoli]: https://github.com/MicheleBertoli
[KentCDodds]: https://github.com/kentcdodds
[jest-styled-components]: https://github.com/styled-components/jest-styled-components
[`jest-glamor-react`]: https://github.com/kentcdodds/jest-glamor-react
