import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComponent = ({ images }) => {
    return (
        <Carousel>
            {Array.isArray(images) && images.length > 0 ? (
                images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={`/storage/images/${image.path}`}
                            alt={`Imagen de la campaña ${index}`}
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                ))
            ) : (
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/storage/images/defecto.jpg"
                        alt="Imagen por defecto"
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default CarouselComponent;
