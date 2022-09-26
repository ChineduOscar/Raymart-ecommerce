import React from 'react';
import OurCollections from '../components/OurCollections';
import TodaysDeal from '../components/TodaysDeal';
import TopSelling from '../components/TopSelling';
import Advertisment from '../components/Advertisment';

const Home = () => {
  return (
    <section className='main-content container'>
      <Advertisment />
      <section className='today-deals'>
        <TodaysDeal />
      </section>

      <section className='top-selling-products'>
        <TopSelling />
      </section>

      <section className='collections'>
        <OurCollections />
      </section>
    </section>
  );
};

export default Home;
