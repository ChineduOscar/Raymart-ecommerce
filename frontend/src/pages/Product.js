import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cart';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { productID } = useParams();
  const product = products.find(
    (product) => product._id.toString() === productID
  );
  const { name, image, price, oldPrice, description } = product;
  const decimalDiscount = ((oldPrice - price) / oldPrice) * 100;
  const discount = Math.ceil(decimalDiscount);

  return (
    <section className='container'>
      <section className='product-page-container'>
        <div className='product-page-container-one'>
          <img className='product-image' src={image} alt='' />
          <div className='product-information'>
            <div className='product-name'>{name}</div>
            <div className='product-inline-tems'>
              <span className='price big'>
                &#8358;{price}{' '}
                {oldPrice && (
                  <span className='old-price price'>&#8358;{oldPrice}</span>
                )}
              </span>
              {oldPrice && <div className='product-discount'>-{discount}%</div>}
            </div>
            <button
              className='button'
              onClick={() => dispatch(addToCart(product))}
            >
              add to cart
            </button>
          </div>
        </div>
        <div className='product-page-container-two'>
          <div className='product-description'>
            <h1 className='content-title description-tilte'>description</h1>
            <div className='description-content'>{description}</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Product;
