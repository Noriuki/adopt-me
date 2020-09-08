import React, { useContext } from 'react';
import { Link } from '@reach/router';
import ThemeContext from './ThemeContext';

const Pet = ({ name, animal, breed, media, location, id }) => {
  const [theme] = useContext(ThemeContext);

  let hero = 'http://placecorgi.com/300/300';
  if (media.length) {
    hero = media[0].small;
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1 style={{ color: theme }}>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
