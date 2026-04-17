import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  text-align: center;
  margin-bottom: 20px;
`;

const NavLinkStyled = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.3s ease;

  /* Standard CSS nesting feature supported by styled-components */
  &:hover {
    color: red;
  }

  /* Hides link entirely if viewport is less than 600px wide */
  @media (max-width: 600px) {
    display: none;
  }
`;

export default function NavigationLink() {
  return (
    <NavContainer>
      <NavLinkStyled href="#">
        Navigation Link (Turns red on hover, hides on mobile screens)
      </NavLinkStyled>
    </NavContainer>
  );
}
