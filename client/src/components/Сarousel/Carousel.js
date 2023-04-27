import { useEffect, useState } from "react";

import './Carousel.css';

const Carousel = (props) => {
    const { photos } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [photos])

    if (!photos.length) {
        return <h1>No photos to show</h1>
    }

    return (
        <div>
            <img className="image" src={photos && photos[currentIndex]} alt={`Animal ${currentIndex}`} />
            <div>
                {currentIndex !== 0 && <button onClick={prevPhoto}>Previous</button> }
                {currentIndex + 1 !== photos.length &&  <button onClick={nextPhoto}>Next</button>}
            </div>
        </div>
    )
}

export default Carousel;