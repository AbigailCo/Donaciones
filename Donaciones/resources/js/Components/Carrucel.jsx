import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/assets/img/img_carrusel_1.png" className="d-block w-100" alt="banner 1" />
        </div>
        <div className="carousel-item">
          <img src="/assets/img/img_carrusel_2.png" className="d-block w-100" alt="banner 2" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
