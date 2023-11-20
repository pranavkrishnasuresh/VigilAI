// Footer.js

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover {
    color: #ffcc00; /* Change the color on hover */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
       Vigil AI{' '}|{' '}
        <FooterLink href="#">Privacy Policy</FooterLink> |{' '}
        <FooterLink href="#">Terms of Service</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
