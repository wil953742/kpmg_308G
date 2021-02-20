import { useRef } from "react";
import styled from "styled-components";

const ImageBox = styled.div`
  height: 62.4vh;
  margin-bottom: 1.45vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .file_input {
    display: none;
    opacity: 0;
  }
`;

interface ImgZoneProps {
  setImgLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setImg: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageZone = ({ setImgLoad, setImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputchecked = () => {
    if (null !== fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const filesSelected = () => {
    if (null !== fileInputRef.current) {
      if (
        fileInputRef.current.files &&
        validateFile(fileInputRef.current.files[0])
      ) {
        setImg(URL.createObjectURL(fileInputRef.current.files[0]));
        setImgLoad(true);
      }
    }
  };
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      if (validateFile(files[0])) {
        setImg(URL.createObjectURL(files[0]));
        setImgLoad(true);
      }
    }
  };
  const validateFile = (file: any) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && validTypes.indexOf(file.type) === -1) {
      alert("jpg, jpeg, png 파일만 가능합니다.");
      return false;
    }
    return true;
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };
  const dragEnter = (e: any) => {
    const drop_box = document.getElementById("drop_container")!;
    drop_box.style.border = "3px dashed white";
    drop_box.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    e.preventDefault();
  };
  const dragLeave = (e: any) => {
    const drop_box = document.getElementById("drop_container")!;
    drop_box.style.border = "none";
    drop_box.style.backgroundColor = "gray";
    e.preventDefault();
  };

  return (
    <ImageBox
      id="drop_container"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      onClick={fileInputchecked}
    >
      <input
        ref={fileInputRef}
        className="file_input"
        type="file"
        onChange={filesSelected}
      />
      <p>사진을 끌어오거나 클릭하여 업로드해주세요.</p>
    </ImageBox>
  );
};
