import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StyledRichtext } from "./styled";
import { LabelText } from "../InputText/styled";

type PropType = {
  values: string;
  onchange: (value: string) => void;
  label?: string;
};

const RichTextEditor = ({ values, onchange, label }: PropType) => {
  const handleChange = (value: string) => {
    onchange(value);
  };

  return (
    <div>
      <LabelText>{label}</LabelText>
      <StyledRichtext theme="snow" value={values} onChange={handleChange} />
    </div>
  );
};

export default RichTextEditor;
