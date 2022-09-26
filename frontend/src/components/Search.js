import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DestopSearch = () => {
  const products = useSelector((state) => state.products);
  const [filteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const handleChange = (e) => {
    setSearchWord(e.target.value);
    // to filter for product and category
    const newFilter = products.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.category.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    searchWord === '' ? setFilteredData([]) : setFilteredData(newFilter);
  };

  const handleClick = () => {
    setSearchWord('');
    setFilteredData([]);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className='search-container'>
      <section className='destop-mode-input'>
        <input
          type='text'
          className='section-input'
          value={searchWord}
          onChange={handleChange}
          placeholder='Search for products and categories...'
        />
      </section>
      {filteredData !== 0 && (
        <div className='destop-search-result-container'>
          <div>
            {filteredData.slice(0, 1).map((singleCategory) => {
              const { _id, category } = singleCategory;
              return (
                <Link
                  key={_id}
                  to={`/singlecategory/${category}`}
                  onClick={handleClick}
                >
                  <div>
                    <div className='search-result'>{category}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            {filteredData.slice(0, 4).map((product) => {
              const { _id, name } = product;
              return (
                <Link key={_id} to={`/product/${_id}`} onClick={handleClick}>
                  <div className='search-result'>{name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileSearch = () => {
  const products = useSelector((state) => state.products);
  const [filteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const handleChange = (e) => {
    setSearchWord(e.target.value);
    // to filter for product and category
    const newFilter = products.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.category.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    searchWord === '' ? setFilteredData([]) : setFilteredData(newFilter);
  };

  const handleClick = () => {
    setSearchWord('');
    setFilteredData([]);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className='search-container'>
      <section className='mobile-mode-input'>
        <input
          type='text'
          className='section-input'
          value={searchWord}
          onChange={handleChange}
          placeholder='Search for products and categories...'
        />
      </section>
      {filteredData !== 0 && (
        <div className='mobile-search-result-container'>
          <div>
            {filteredData.slice(0, 1).map((singleCategory) => {
              const { _id, category } = singleCategory;
              return (
                <Link
                  key={_id}
                  to={`/singlecategory/${category}`}
                  onClick={handleClick}
                >
                  <div>
                    <div className='search-result'>{category}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            {filteredData.slice(0, 4).map((product) => {
              const { _id, name } = product;
              return (
                <Link key={_id} to={`/product/${_id}`} onClick={handleClick}>
                  <div className='search-result'>{name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { MobileSearch, DestopSearch };
