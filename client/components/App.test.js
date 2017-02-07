import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

// const React = require('react');
// const mount = require('enzyme').mount;
// const shallow = require('enzyme').shallow;
// const expect = require('chai').expect;

import App from './App';
// const App = require('./App');

describe('<App />', () => {
  it('renders a wrapping div', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper.name());
    expect(wrapper.name()).to.equal('div');
  })
});
