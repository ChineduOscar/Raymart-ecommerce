import React from 'react';
import { Link } from 'react-router-dom';
import toTop from '../utils/toTop';

const Footer = () => {
  return (
    <footer className='footer'>
      <Link to='/' onClick={toTop}>
        <div className='logo'>Raymart</div>
      </Link>
      <h4 className='number'>+234 812 255 1232</h4>
      <div className='newsletter'>
        <h4>subscribe to our newsletter</h4>
        <section className='mobile-mode-input email-suscription'>
          <input
            type='text'
            className='section-input email-input'
            placeholder='Enter your Email Address...'
          />
          <button className='button email-button'>Subscribe</button>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
