import React from 'react';
import truncate from '../utils/truncate';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toTop from '../utils/toTop';

const SingleCategory = () => {
  const products = useSelector((state) => state.products);
  const { category } = useParams();
  const SinglecategoryItems = products.filter(
    (product) => product.category === category
  );

  return (
    <section className='container'>
      <section className='single-category-products'>
        {SinglecategoryItems.map((items) => {
          const { _id, name, image, price, oldPrice } = items;
          const decimalDiscount = ((oldPrice - price) / oldPrice) * 100;
          const discount = Math.ceil(decimalDiscount);

          return (
            <Link key={_id} to={`/product/${_id}`} onClick={toTop}>
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
      </section>
    </section>
  );
};

export default SingleCategory;
