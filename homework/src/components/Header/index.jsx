import React, {useEffect} from 'react';
import './index.css'
import { useTheme } from '../../contexts/ThemeContext.jsx';



const Header = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <header className={isDarkTheme ? 'header': 'header-light'}>
      <h1>{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</h1>
      <button className='button' onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

export default Header;