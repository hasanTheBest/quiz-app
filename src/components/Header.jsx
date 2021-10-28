import { useState } from "react";
import { Link as LinkR, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Navbar = styled.nav`
  width: 100%;
  padding: 2rem;
  text-align: center;
  transition: all 300ms ease;
  position: relative;
  ${(p) => p.theme.color.gradient("45deg")};

  ${(p) => p.theme.breakpoints.md} {
    position: absolute;
    top: 0;
    padding-top: 7rem;
    height: 100%;
    left: auto;
    z-index: 99;
    transform: ${(p) => (!p.open ? "translateX(100%)" : "translateX(0)")};
  }
`;

const Link = styled(LinkR)`
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.1rem;
  padding: 0.8rem 1.3rem;
  color: rgba(229, 238, 237, 0.8);

  &:hover,
  &:active,
  &.active {
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    ${(p) => p.theme.color.gradient("-45deg")}
  }

  ${(p) => p.theme.breakpoints.md} {
    font-size: 1rem;
    display: block;
  }
`;

const StyledMobileNavbar = styled("div")`
  width: 100%;
  display: none;
  position: relative;
  padding: 1rem;
  box-shadow: 3px 5px 5px 2px ${(p) => p.theme.color.black_a3};
  ${(p) => p.theme.color.gradient("45deg")}

  ${(p) => p.theme.breakpoints.md} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }
`;
const StyledLogo = styled(Link)`
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  padding-left: 0;
`;
const StyledNavIcon = styled(Link)`
  --height: 48px;
  font-weight: 700;
  width: var(--height);
  height: var(--height);
  line-height: var(--height);
  text-align: center;
  position: relative;
  box-shadow: 3px 5px 5px 2px ${(p) => p.theme.color.black_a3},
    -3px -5px 5px 2px ${(p) => p.theme.color.black_a3};
  border-radius: 0.3rem;
  transition: opacity 200ms ease;

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    font-weight: 500;
    transition: opacity 300ms ease;

    &.close {
      font-size: 3.3rem;
    }

    ${(p) => {
      if (!p.open) {
        return `&.close {
      opacity: 0;
      z-index: 5;
    }`;
      } else {
        return `
        &.close {
      opacity: 1;
      z-index: 10;
    }
    &.open{
      z-index: 5;
      opacity: 0;
    }
        `;
      }
    }}
  }
`;

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileNav = () => setIsOpen((prev) => !prev);

  return (
    <StyledHeader>
      <StyledMobileNavbar>
        <StyledLogo>Quiz</StyledLogo>
        <StyledNavIcon as="div" onClick={toggleMobileNav} open={isOpen}>
          <span className="close">&#xD7;</span>
          <span className="open">&#x2630;</span>
        </StyledNavIcon>
      </StyledMobileNavbar>
      <Navbar open={isOpen}>
        <Link
          to="/"
          className={`${location.pathname === "/" ? "active" : ""}`}
          onClick={toggleMobileNav}
        >
          Home
        </Link>
        <Link
          to="/result"
          className={`${location.pathname === "/result" ? "active" : ""}`}
          onClick={toggleMobileNav}
        >
          Result
        </Link>
        <Link
          to="/about"
          className={`${location.pathname === "/about" ? "active" : ""}`}
          onClick={toggleMobileNav}
        >
          About
        </Link>
      </Navbar>
    </StyledHeader>
  );
};
