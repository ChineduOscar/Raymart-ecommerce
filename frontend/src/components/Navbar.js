import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toTop from '../utils/toTop';
import { logout, reset } from '../features/auth/authSlice';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import MainMenu from './MainMenu';
import { DestopSearch, MobileSearch } from './Search';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { amount } = cart;

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <header className='header'>
        <header className='top-header'>
          <nav className='left-navigation'>
            <Link to='/' onClick={toTop}>
              <div className='logo'>Raymart</div>
            </Link>
          </nav>
          <DestopSearch />
          <nav className='right-navigation'>
            {user ? (
              <div onClick={onLogOut} className='logout'>
                logout
              </div>
            ) : (
              <NavLink className='login' to='/login'>
                <div className='login-text'>login</div>
                <AiOutlineUser className='icon' />
              </NavLink>
            )}
            <NavLink className='cart' to='/cart'>
              <AiOutlineShoppingCart className='icon' />
              <span className='cart-item-amount'>{amount}</span>
            </NavLink>
          </nav>
        </header>

        <MobileSearch />
      </header>

      <MainMenu />
    </>
  );
};

export default Navbar;
