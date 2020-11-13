import React from 'react';
import movieWebM from '../assets/test.webm';
import movieMP4 from '../assets/test.mp4';
import FeaturedProducts from './Products/Featured';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <video preload="auto" autoPlay loop muted className="Video">
          <source src={movieMP4} type="video/mp4" />
          <source src={movieWebM} type="video/webm" />
        </video>
        <FeaturedProducts />
      </div>
    );
  }
}

export default Home;
