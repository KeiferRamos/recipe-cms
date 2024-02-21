import { Modal } from "antd";
import styled from "styled-components";

export const ContentContainer = styled.div`
  border: 5px dashed #bebebe;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;

  button {
    width: 100%;
    height: 50px;
  }

  .content-input {
    position: relative;

    .remove-btn {
      position: absolute;
      top: 15px;
      right: 10px;
      background: #ea8484;
      color: #fff;
      padding: 8px;
      border-radius: 3px;
      z-index: 1;
    }
  }
`;

export const StyledModal = styled(Modal)`
  .ant-skeleton {
    width: 100%;
  }

  .ant-skeleton-image {
    width: 100% !important;
  }

  h2 {
    margin-bottom: 30px;
    font-size: 15px;
    text-align: center;
  }

  p {
    margin-top: 10px;
    text-align: center;
  }
`;
