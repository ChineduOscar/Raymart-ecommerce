import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toTop from '../utils/toTop';

const OurCollections = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <>
      <h1 className='content-title'>check out our collections</h1>
      <div className='media-scroller snaps-inline'>
        {categories.map((itemCategory) => {
          const { _id, image, category } = itemCategory;
          return (
            <Link
              key={_id}
              to={`/singlecategory/${category}`}
              onClick={() => toTop()}
            >
              <div className='product-elements'>
                <img className='scroll-images' src={image} alt='' />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default OurCollections;
