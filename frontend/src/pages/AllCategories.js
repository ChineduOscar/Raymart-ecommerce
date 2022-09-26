import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toTop from '../utils/toTop';

const AllCategories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <section className='container'>
      <section className='single-category-products'>
        {categories.map((singleCategory) => {
          const { _id, image, category } = singleCategory;

          return (
            <Link key={_id} to={`/singlecategory/${category}`} onClick={toTop}>
              <div className='product-elements'>
                <img className='scroll-images' src={image} alt='' />
                <div className='category-tilte'>{category}</div>
              </div>
            </Link>
          );
        })}
      </section>
    </section>
  );
};

export default AllCategories;
