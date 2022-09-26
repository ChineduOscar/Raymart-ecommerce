import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import truncate from '../utils/truncate';
import toTop from '../utils/toTop';

const TodaysDeal = () => {
  const products = useSelector((state) => state.products);
  const prodLength = products.length;

  return (
    <>
      <h1 className='content-title'>today's deal</h1>

      <div className='media-scroller snaps-inline'>
        {products.slice(prodLength - 6, prodLength).map((product) => {
          const { _id, name, image, price, oldPrice } = product;
          const decimalDiscount = ((oldPrice - price) / oldPrice) * 100;
          const discount = Math.ceil(decimalDiscount);

          return (
            <Link key={_id} to={`/product/${_id}`} onClick={() => toTop()}>
              <div className='product-elements'>
                <img className='scroll-images' src={image} alt='' />
                {oldPrice && <div className='discount'>-{discount}%</div>}
                <div className='name'>{truncate(name, 22)}</div>
                <span className='price'>
                  &#8358;{price}{' '}
                  {oldPrice && (
                    <span className='product-old-price price'>
                      &#8358;{oldPrice}
                    </span>
                  )}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TodaysDeal;
