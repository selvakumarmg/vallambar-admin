import React, { useState } from 'react';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header>
      <nav>
        {/* <div className="logo">Your Logo</div> */}
        <div className="menu-icon" onClick={toggleDrawer}>
          <i className="fa fa-bars">Menu</i>
        </div>
      </nav>
      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={toggleDrawer} />
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="menu">
          <li><a href="#">Menu Item 1</a></li>
          <li><a href="#">Menu Item 2</a></li>
          <li><a href="#">Menu Item 3</a></li>
          <li><a href="#">Menu Item 4</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
