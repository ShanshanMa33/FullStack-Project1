import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './SearchBar.css';
import Button from '../common/Button/Button'; 
import searchIcon from '../../assets/search.svg';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';
  const [keyword, setKeyword] = useState(urlSearchQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setKeyword(urlSearchQuery);
  }, [urlSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} 
      />
      <Button type="submit" variant="ghost" size="raw">
        <img src={searchIcon} className="search-icon" alt="search icon" />
      </Button>
    </form>
  );
};

export default SearchBar;