import React, { useState } from 'react';
import '../css/Carousel.css'; // Asegúrate de crear este archivo CSS

interface CarouselImage {
    imagen: string;        // URL de la imagen
    titulo: string;     // Título de la imagen
    descripcion: string; // Descripción de la imagen
}

const Carousel = ({ images }: { images: CarouselImage[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <div className="carousel">
            <button className="arrow left" onClick={prevSlide}>◀</button>
            <div className="carousel-content">
                <h1  className="carousel-title">{images[currentIndex].titulo}</h1>
                <img 
                    src={`data:image/jpeg;base64,${images[currentIndex].imagen}`} 
                    alt={images[currentIndex].titulo} 
                    className="carousel-image" 
                />
                <div className="description">
                    <p>{images[currentIndex].descripcion}</p>
                </div>
            </div>
            <button className="arrow right" onClick={nextSlide}>▶</button>
        </div>
    );
};

export default Carousel;