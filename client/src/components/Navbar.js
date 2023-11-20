// Navbar.js

import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: linear-gradient(to right, #4b6cb7, #182848); /* Gradient background */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled.a`
  text-decoration: none;
`;

const Logo = styled.img`
  width: 50px; /* Adjust the width of the logo */
  height: auto; /* Maintain aspect ratio */
`;

const BrandText = styled.div`
  font-family: 'YourStylishFont', sans-serif; /* Replace 'YourStylishFont' with the actual font name or import */
  font-size: 24px; /* Adjust the font size */
  color: #fff; /* Text color for the brand */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #fff; /* Text color for links */
    text-decoration: none;
    font-size: 16px;

    &:hover {
      color: #ffcc00; /* Change the color on hover */
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoLink href="/"> {/* Set the home page URL */}
        <Logo src="/path/to/your/logo.png" alt="Logo" />
      </LogoLink>
      <BrandText>Vigil AI</BrandText>
      {/* <NavLinks>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </NavLinks> */}
    </NavbarContainer>
  );
};

export default Navbar;
