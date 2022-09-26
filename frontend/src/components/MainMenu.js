import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainMenu = () => {
  const categories = useSelector((state) => state.categories);
  const allCategories = [...new Set(categories.map((item) => item.category))];

  return (
    <main className='main-menu'>
      <NavLink to='/allcategories'>
        <div className='menu-item'>categories</div>
      </NavLink>
      {allCategories.slice(0, 3).map((category, index) => {
        return (
          <NavLink key={index} to={`/singlecategory/${category}`}>
            <div className='menu-item'>{category}</div>
          </NavLink>
        );
      })}
    </main>
  );
};

export default MainMenu;
