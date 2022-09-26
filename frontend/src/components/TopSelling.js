import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import truncate from '../utils/truncate';
import toTop from '../utils/toTop';

const TopSelling = () => {
  const products = useSelector((state) => state.products);

  return (
    <>
      <h1 className='content-title'>top selling products</h1>
      <div className='media-scroller snaps-inline'>
        {products.slice(0, 6).map((product) => {
          const { _id, name, image, price, oldPrice } = product;
          const decimalDiscount = ((oldPrice - price) / oldPrice) * 100;
          const discount = Math.ceil(decimalDiscount);

          return (
            <Link key={_id} to={`/product/${_id}`} onClick={() => toTop()}>
              <div key={_id} className='product-elements'>
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

export default TopSelling;
