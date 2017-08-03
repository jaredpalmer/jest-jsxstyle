import * as enzyme from 'enzyme';

import { Block } from 'jsxstyle';
import React from 'react';
import renderer from 'react-test-renderer';
import serializer from './.';
import toJson from 'enzyme-to-json';

expect.addSnapshotSerializer(serializer);

describe('Snapshot Serializer', () => {
  test('react-test-renderer', () => {
    const tree = renderer
      .create(
        <Block color="red" margin="1rem" background="white">
          Hello World, this is my first jsxstyle component!
        </Block>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('works when root element is not a jsxstyle element', () => {
    const tree = renderer
      .create(
        <div>
          <Block color="black">
            Hello World, this is my first jsxstyle component!
          </Block>
        </div>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('handles children', () => {
    const tree = renderer
      .create(
        <Block color="orange">
          <Block margin="4rem">
            Hello World, this is my first jsxstyle component!
          </Block>
        </Block>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('does not interfere with non jsxstyle components', () => {
    const tree = renderer
      .create(<div>Hello World, this is my first jsxstyle component!</div>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('enzyme', () => {
    const ui = (
      <Block color="green">
        <Block margin="4rem">
          Hello World, this is my first jsxstyle component!
        </Block>
      </Block>
    );

    const enzymeMethods = ['shallow', 'mount', 'render'];
    enzymeMethods.forEach(method => {
      const tree = enzyme[method](ui);
      expect(toJson(tree)).toMatchSnapshot(`enzyme.${method}`);
    });
  });
});
