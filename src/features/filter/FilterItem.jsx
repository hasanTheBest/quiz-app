import React from "react";
import styled from "styled-components";
import {
  StyledFilterCategory,
  StyledFilterLabel,
  StyledFilterSelectCategory,
} from "./FilterItemCat";

const StyledFilterWrapper = styled(StyledFilterCategory)``;
const Label = styled(StyledFilterLabel)``;
const Select = styled(StyledFilterSelectCategory)``;

export default function FilterItem({ label, options, setOption, option }) {
  const catOptions = options.map((name) => (
    <option key={name} value={name} onClick={() => setOption(name)}>
      {name}
    </option>
  ));

  return (
    <StyledFilterWrapper>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Select name={label.toLowerCase()} id={label.toLowerCase()}>
        <option value="">All</option>
        {catOptions}
      </Select>
    </StyledFilterWrapper>
  );
}
