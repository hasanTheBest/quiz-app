import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.3rem 1rem;
  text-align: center;
`;

export const Footer = () => (
  <StyledFooter>
    &copy;
    <a href="https://linkedin.com/m-hasan" rel="noreferrer" target="_blank">
      Mahmudul Hasan
    </a>
  </StyledFooter>
);
