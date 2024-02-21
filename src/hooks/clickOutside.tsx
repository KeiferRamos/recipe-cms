import React, { ReactElement, useRef } from "react";

interface CustomDivProps {
  onClickOutside: () => void;
  children: ReactElement;
}

const CustomDiv: React.FC<CustomDivProps> = ({ onClickOutside, children }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  const cleanup = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

  React.useEffect(() => {
    return cleanup;
  }, []);

  return (
    <div ref={divRef} style={{ height: "100%" }}>
      {children}
    </div>
  );
};

export default CustomDiv;
