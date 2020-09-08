import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';

const SearchParams = (props) => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet.breeds(animal).then((res) => {
      const BreedStrings = res.breeds.map((breedObj) => breedObj.name);
      setBreeds(BreedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="themeSelect">
          Theme
          <select
            id="themeSelect"
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru" aria-label="peru">
              peru
            </option>
            <option value="darkblue" aria-label="darkblue">
              darkblue
            </option>
            <option value="mediumorchid" aria-label="mediumorchid">
              mediumorchid
            </option>
            <option value="chartreuse" aria-label="chartreuse">
              chartreuse
            </option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
