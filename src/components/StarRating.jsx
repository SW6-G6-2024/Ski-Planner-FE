import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ onRatingSelected }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            className={`text-xl cursor-pointer ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => {
              setRating(ratingValue);
              if (onRatingSelected) {
                onRatingSelected(ratingValue);
              }
            }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            style={{transition: 'color 0.2s', padding: '0.25rem', backgroundColor: 'transparent'}}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

// Define propTypes for StarRating component
StarRating.propTypes = {
  onRatingSelected: PropTypes.func.isRequired,
};

export default StarRating;
