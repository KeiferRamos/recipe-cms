import { useEffect, useState } from "react";
import { StyledDropdown, StyledTags } from "./styled";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomDiv from "../../hooks/clickOutside";
import { Empty } from "antd";

type PropType = {
  placeholder: string;
  options?: string[];
  values: any[];
  type: "select" | "input";
  onchange: (values: string[]) => void;
};

function TagsHolder({
  placeholder,
  values,
  onchange,
  type,
  options,
}: PropType) {
  const [label, setLabel] = useState(placeholder);
  const [addedTags, setAddedTags] = useState("");
  const [clicked, setClicked] = useState(false);

  const addInput = () => {
    setLabel("");
    setClicked(true);
  };

  const clickedOutside = () => {
    setClicked(false);
    if (values.length) {
      setLabel("");
    } else {
      setLabel(placeholder);
    }
  };

  function handleKeyDown(e: any) {
    if (e.code === "ShiftRight" && addedTags) {
      onchange([...values, addedTags]);
      setAddedTags("");
    }
  }

  return (
    <CustomDiv onClickOutside={() => clickedOutside()}>
      <StyledTags onClick={() => addInput()}>
        {values.length ? (
          values.map((tag) => {
            return (
              <span className="recipe-tag" key={tag}>
                {tag}
                <DeleteOutlined
                  onClick={() => {
                    onchange(values.filter((el) => el !== tag));
                  }}
                />
              </span>
            );
          })
        ) : (
          <p>{label}</p>
        )}
        {clicked ? (
          <>
            {type === "input" ? (
              <input
                type="text"
                value={addedTags}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setAddedTags(e.target.value)}
                autoFocus
              />
            ) : (
              <StyledDropdown>
                {options
                  ? options
                      .filter((option) => !values.includes(option))
                      .map((name) => {
                        return (
                          <span
                            className="recipe-tag"
                            onClick={() => onchange([...values, name])}
                          >
                            {name}
                          </span>
                        );
                      })
                  : null}
              </StyledDropdown>
            )}
          </>
        ) : null}
      </StyledTags>
    </CustomDiv>
  );
}

export default TagsHolder;
