import React from 'react';
import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((el) => (
          <Pet
            animal={el.type}
            key={el.id}
            name={el.name}
            breed={el.breeds.primary}
            media={el.photos}
            location={`${el.contact.address.city}, ${el.contact.address.state}`}
            id={el.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
