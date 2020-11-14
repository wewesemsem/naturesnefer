import React from 'react';
import movieWebM from '../assets/test.webm';
import movieMP4 from '../assets/test.mp4';
import FeaturedProducts from './Products/Featured';
import { Container } from 'react-bootstrap';
import HomeButtons from './HomeButtons';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Vid-wrap">
          <video preload="auto" autoPlay loop muted className="Video">
            <source src={movieMP4} type="video/mp4" />
            <source src={movieWebM} type="video/webm" />
          </video>
          <HomeButtons />
        </div>
        <FeaturedProducts />
      </div>
    );
  }
}

export default Home;
