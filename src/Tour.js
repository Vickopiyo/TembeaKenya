import React, { useState } from "react";

const Tour = ({ id, image, info, name, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4 className="tour-description">{name}</h4>
          <h4 className="tour-price">Ksh{price}</h4>
        </div>
        <p> 
          {readMore ? info : `${info.substring(0, 100)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "Show less" : "Read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          Delete 
        </button>
      </footer>
    </div>
  );
};

export default Tour;
