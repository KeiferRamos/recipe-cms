import React, { useEffect, useRef, useState } from "react";
import { StyledInputHolder } from "./styled";
import { Button, Empty, Input, InputRef, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type PropType = {
  label: string;
  values: string[];
  onchange: (values: string[]) => void;
};

function InputHolder({ label, values, onchange }: PropType) {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");

  const ref = useRef<InputRef>(null);

  const addInput = () => {
    setAdding(true);
    ref.current?.focus();
  };

  const onSubmit = () => {
    setAdding(false);
    setValue("");
    onchange([...values, value]);
  };

  const deleteItem = (item: string) => {
    onchange(values.filter((val) => val !== item));
  };

  return (
    <StyledInputHolder>
      <Button className="add-btn" disabled={adding} onClick={() => addInput()}>
        Add {label}
      </Button>
      {adding ? (
        <Space.Compact style={{ width: "100%", marginTop: "10px" }}>
          <Input
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={() => onSubmit()} type="primary">
            Submit
          </Button>
        </Space.Compact>
      ) : null}
      <ul>
        {values.length ? (
          values.map((value) => {
            return (
              <li key={value}>
                {value}
                <DeleteOutlined onClick={() => deleteItem(value)} />
              </li>
            );
          })
        ) : (
          <Empty style={{ margin: 20 }} />
        )}
      </ul>
    </StyledInputHolder>
  );
}

export default InputHolder;
