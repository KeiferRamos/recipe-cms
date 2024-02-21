import { ErrorMessage } from "formik";
import styled from "styled-components";

export const LabelText = styled.p`
  color: #388be4;
  padding-left: 3px;
  margin: 8px 0;
`;

export const StyledError = styled(ErrorMessage)`
  position: absolute;
  top: 8px;
  right: 15px;
  color: red;
  text-align: end;
  text-transform: capitalize;
`;
