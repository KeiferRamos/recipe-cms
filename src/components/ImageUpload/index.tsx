import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoImageIcon from "../../assets/images/no-picture-taking.png";
import { LoadingOutlined } from "@ant-design/icons";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StyledUpload } from "./styled";

type PropType = {
  value: string;
  onchange: (value: string) => void;
};

function Upload({ onchange, value }: PropType) {
  const [image, setImage] = useState<any>(value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImage(value);
  }, [value]);

  function previewFile({ target: { files } }: any) {
    if (files) {
      setUploading(true);
      const file = files[0];
      const imgRef = ref(storage, file.name);
      uploadBytes(imgRef, file).then((res) => {
        getDownloadURL(res.ref).then((url) => {
          onchange(url);
          setUploading(false);
        });
      });
    }
  }

  return (
    <StyledUpload>
      <div className="image-container">
        {uploading ? (
          <LoadingOutlined />
        ) : image ? (
          <img className="image-container-profile" src={image} alt="" />
        ) : (
          <img className="image-container-icon" src={NoImageIcon} />
        )}
      </div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => previewFile(e)}
      />
    </StyledUpload>
  );
}

export default Upload;
