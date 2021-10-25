import { Link as LinkR, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = styled.nav`
  background: linear-gradient(45deg, darkslateblue, darkcyan, darkslateblue);
  width: 100%;
  padding: 2rem;
  text-align: center;
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
    background: linear-gradient(-45deg, darkslateblue, darkcyan, darkslateblue);
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  }
`;

export const Header = () => {
  const location = useLocation();

  return (
    <StyledHeader>
      <Navbar>
        <Link
          to="/"
          className={`link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/result"
          className={`link ${location.pathname === "/result" ? "active" : ""}`}
        >
          Result
        </Link>
        <Link
          to="/about"
          className={`link ${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>
      </Navbar>
    </StyledHeader>
  );
};
