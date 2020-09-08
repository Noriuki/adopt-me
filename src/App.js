import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  const themeHook = useState('peru');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <h1>Adopt Me!</h1>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
