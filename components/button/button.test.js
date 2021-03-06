import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {CaretDownIcon} from '../icon';

import Button from './button';
import styles from './button.css';

describe('Button', () => {
  const shallowButton = props => shallow(<Button {...props}/>);
  const mountButton = props => mount(<Button {...props}/>);
  const renderButton = props => render(<Button {...props}/>);

  it('should create component', () => {
    mountButton().should.have.type(Button);
  });

  it('should set _default modifier', () => {
    shallowButton().should.have.className(styles.button);
  });

  it('should set modifiers', () => {
    const wrapper = shallowButton({
      active: true,
      danger: true,
      delayed: true,
      loader: true,
      primary: true,
      short: true
    });

    wrapper.should.have.className(styles.active);
    wrapper.should.have.className(styles.danger);
    wrapper.should.have.className(styles.delayed);
    wrapper.should.have.className(styles.loader);
    wrapper.should.have.className(styles.primary);
    wrapper.should.have.className(styles.short);
  });

  it('should add icon', () => {
    const wrapper = renderButton({
      icon: CaretDownIcon
    });

    wrapper.should.have.className(styles.withIcon);
    wrapper.should.have.descendants('svg[style*="16"]');
    wrapper.find('use').should.have.attr('href', '#ring-icon-caret-down');
  });

  it('should set custom class', () => {
    const CUSTOM_CLASS = 'test';

    const wrapper = shallowButton({
      className: CUSTOM_CLASS
    });

    wrapper.should.have.className(CUSTOM_CLASS);
  });

  it('should render link instead of button if href specified', () => {
    const linkButton = shallow(<Button href="http://www.jetbrains.com"/>);
    linkButton.should.have.tagName('a');
    linkButton.should.not.have.tagName('button');
    linkButton.should.have.attr('href', 'http://www.jetbrains.com');
  });
});
