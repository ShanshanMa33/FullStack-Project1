import React from 'react';
import './SearchBar.css';
import Button from '../common/Button/Button'; 
import searchIcon from '../../assets/search.svg';

const SearchBar = () => {

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching...");
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search" 
      />
      <Button type="submit" variant="ghost" size="raw">
        <img src={searchIcon} className="search-icon" alt="search icon" />
      </Button>
    </form>
  );
};

export default SearchBar;