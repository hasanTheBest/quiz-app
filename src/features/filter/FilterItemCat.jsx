import React from "react";
import styled from "styled-components";

const CATEGORIES = [
  ["Linux", 99],
  ["Bash", 77],
  ["PHP", 181],
  ["Docker", 125],
  ["HTML", 139],
  ["MySQL", 153],
  ["WordPress", 66],
  ["Laravel", 10],
  ["Kubernetes", 136],
  ["Javascript", 25],
  ["DevOps", 23],
];

export const StyledFilterCategory = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;

export const StyledFilterLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 0.9rem;
  color: darkcyan;
`;

export const StyledFilterSelectCategory = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border: 0;
  border-radius: 0.2rem;
`;

export default function FilterItemCat({ option, setOption }) {
  const catOptions = CATEGORIES.map(([name, count]) => (
    <option key={name} value={name} onClick={() => setOption(name, count)}>
      {`${name} (${count})`}
    </option>
  ));

  return (
    <StyledFilterCategory>
      <StyledFilterLabel htmlFor="categories">Categories</StyledFilterLabel>
      <StyledFilterSelectCategory name="categories" id="categories">
        <option value="random">All</option>
        {catOptions}
      </StyledFilterSelectCategory>
    </StyledFilterCategory>
  );
}
