import './index.scss';

import * as toolkit from './shared/js/toolkit';

import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  toolkit.sayHello('index.js');
});

const logos = [].slice.call(document.querySelectorAll('.logo'));

gsap.to(logos, {duration: 1, rotation: '360deg', repeat: -1, repeatDelay: 1, stagger: 0.5, ease: 'power1.inOut'});