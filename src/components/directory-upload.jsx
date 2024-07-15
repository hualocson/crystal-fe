"use client";
import Image from "next/image";
import React, { useState } from "react";

const DirectoryUpload = ({ onClick }) => {
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };
  return (
    <div>
      <input
        onChange={onChange}
        onClick={onClick}
        type="file"
        name="file"
        multiple
        className="hidden"
      />
      {imgsSrc.map((link) => (
        <Image key={link} src={link} alt="image" width={200} height={200} />
      ))}
    </div>
  );
};

export default DirectoryUpload;
