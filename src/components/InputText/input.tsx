import { Col } from "antd";
import { Input } from "formik-antd";
import { LabelText, StyledError } from "./styled";

type inputType = {
  label?: string;
  placeholder: string;
  name: string;
  secured?: boolean;
  span?: number;
  textarea?: boolean;
};

function InputText({
  label,
  placeholder,
  name,
  secured,
  span,
  textarea,
}: inputType) {
  return (
    <Col span={span ? span : 12} style={{ position: "relative" }}>
      {label ? <LabelText>{label}</LabelText> : null}
      {secured ? (
        <Input.Password
          placeholder={placeholder}
          name={name}
          style={{ height: "40px" }}
        />
      ) : textarea ? (
        <Input.TextArea
          name={name}
          placeholder={placeholder}
          autoSize={{ minRows: 5, maxRows: 10 }}
        ></Input.TextArea>
      ) : (
        <Input
          name={name}
          placeholder={placeholder}
          style={{ height: "40px" }}
        />
      )}
      <StyledError name={name} component={"span"}></StyledError>
    </Col>
  );
}

export default InputText;
