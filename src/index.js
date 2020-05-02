import './index.scss';

import * as toolkit from './shared/js/toolkit';

import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  if (toolkit.sayHi) toolkit.sayHi('mate', 'index');

  const logo = toolkit.qs('.webpack-logo');

  gsap.to(logo, {duration: 1, rotation: '360deg', repeat: -1, repeatDelay: 1, stagger: 0.5, ease: 'power1.inOut'});
});
