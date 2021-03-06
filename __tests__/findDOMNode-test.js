/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';
jest.dontMock('../src');
var React = require('../src');
var ReactDOM = require('../src');
var ReactTestUtils = {
  renderIntoDocument: function(instance) {
        var div = document.createElement('div');
        // None of our tests actually require attaching the container to the
        // DOM, and doing so creates a mess that we rely on test isolation to
        // clean up, so we're going to stop honoring the name of this method
        // (and probably rename it eventually) if no problems arise.
        // document.documentElement.appendChild(div);
        return ReactDOM.render(instance, div);
      }
  };

describe('findDOMNode', function() {
  it('findDOMNode should return null if passed null', function() {
    expect(ReactDOM.findDOMNode(null)).toBe(null);
  });

  it('findDOMNode should find dom element', function() {
    var MyNode = React.createClass({
      render: function() {
        return <div><span>Noise</span></div>;
      },
    });

    var myNode = ReactTestUtils.renderIntoDocument(<MyNode />);
    var myDiv = ReactDOM.findDOMNode(myNode);
    var mySameDiv = ReactDOM.findDOMNode(myDiv);
    expect(myDiv.tagName).toBe('DIV');
    expect(mySameDiv).toBe(myDiv);
  });

  it('findDOMNode should reject random objects', function() {
    expect(function() {
      ReactDOM.findDOMNode({foo: 'bar'});
    })
      .toThrow();
  });

  it('findDOMNode should reject unmounted objects with render func', function() {
    var Foo = React.createClass({
      render: function() {
        return <div />;
      },
    });

    var container = document.createElement('div');
    var inst = ReactDOM.render(<Foo />, container);
    ReactDOM.unmountComponentAtNode(container);

    expect(() => ReactDOM.findDOMNode(inst)).toThrow();
  });

});
