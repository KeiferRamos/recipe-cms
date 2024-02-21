import { Checkbox } from "antd";
import styled from "styled-components";

export const StyledCheckbox = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  align-items: center;
  gap: 20px;
  text-transform: capitalize;
  margin: 10px 0;
  border: 1px solid #bebebe;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
`;
