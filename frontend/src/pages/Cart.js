import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increase, decrease, removeItem } from '../features/cart/cart';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import toTop from '../utils/toTop';
import authService from '../features/auth/authService';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems, amount, total } = cart;
  const [txRef, setTxRef] = useState('');

  // configuration for flutterwave payment method
  const config = {
    public_key: 'FLWPUBK_TEST-98bfa797daa24fd6f4256ee998b5b248-X',
    tx_ref: txRef ? txRef : Date.now(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.user.email,
      name: user?.user.firstName,
    },
    customizations: {
      title: 'Raymart',
      description: 'Payment for items in cart',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  // flutterwave configuration
  const totalAmount = {
    total,
  };
  const handleFee = async () => {
    try {
      const response = await authService.flutterwavePayment(totalAmount);
      setTxRef(response.tx_ref);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    toTop();
    if (!user) {
      navigate('/login');
    } else {
      handleFee();
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
      });
    }
  };

  if (amount === 0) {
    return (
      <section className='small-container'>
        <h2>Hi, {user && user.user.firstName}</h2>
        <h4>your cart is empty.</h4>
      </section>
    );
  }

  return (
    <section className='cart-section container'>
      <div className='total-section'>
        <div className='page-header'>shopping cart</div>
        <h1 className='content-title content-spaced'>
          <div>
            <div>subtotal</div>
            <div className='number-of-items'>
              {amount} {amount === 1 ? 'item' : 'items'}
            </div>
          </div>
          <div className='total-items'>&#8358;{total}</div>
        </h1>
      </div>
      <div className='content-section'>
        {cartItems.map((items) => {
          const { _id, image, name, price, oldPrice, amount } = items;
          const decimalDiscount = ((oldPrice - price) / oldPrice) * 100;
          const discount = Math.ceil(decimalDiscount);
          return (
            <div key={_id} className='items'>
              <div className='flex-items'>
                <img className='product-images' src={image} alt='' />
                <button
                  className='button remove-btn'
                  onClick={() => dispatch(removeItem(_id))}
                >
                  remove
                </button>
              </div>

              <div className='grid-item'>
                <div className='product-name small'>{name}</div>
                <div className='product-price price'>&#8358;{price}</div>
                <div className='inline-element prices'>
                  {oldPrice && (
                    <div className='product-old-price price'>
                      &#8358;{oldPrice}
                    </div>
                  )}
                  {oldPrice && (
                    <div className='product-discount'>-{discount}%</div>
                  )}
                </div>
                <div className='increament-decrement'>
                  <button
                    className='inline button'
                    onClick={() => dispatch(increase(_id))}
                  >
                    +
                  </button>
                  <span className='increase-amount'>{amount}</span>
                  <button
                    className='inline button'
                    onClick={() => {
                      if (amount === 1) {
                        dispatch(removeItem(_id));
                        return;
                      }
                      dispatch(decrease(_id));
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className='buttons'>
          <button className='back-btn button' onClick={() => navigate(-1)}>
            back
          </button>

          <button onClick={handleCheckout} className='checkout-btn button'>
            checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
