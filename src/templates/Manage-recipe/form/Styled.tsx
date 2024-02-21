import { Form } from "formik-antd";
import styled from "styled-components";

export const StyledContainer = styled.div`
  margin-top: 50px;
`;

export const StyledOptions = styled.div`
  padding: 17px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  color: #626365;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #bebebe;

  .options {
    display: flex;
  }

  .ant-radio-group {
    padding: 5px;
    border-radius: 5px;
  }
`;
