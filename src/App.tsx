import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CandyInfo from './pages/CandyInfo';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export type TSearch = {
  searchValue: string;
  setSearchValue: (s: string) => void;
};

export const SearchContext = React.createContext<TSearch>({
  searchValue: '',
  setSearchValue: () => {},
});

function App() {
  const [searchValue, setSearchValue] = React.useState<string>('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/candy/:id" element={<CandyInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
