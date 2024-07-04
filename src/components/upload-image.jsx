"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "./ui/button";

const UploadImage = () => {
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(); // [1
  const [handledImage, setHandledImage] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  }

  async function handlePredictImage(e) {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to send image");
      }
      const imageData = await response.blob();
      const url = URL.createObjectURL(imageData);
      console.log({ imageData, url });
      setHandledImage(url);
    } catch (error) {
      console.error("Error sending image:", error);
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <span className="flex h-80 w-80 ring-1 items-center justify-center rounded-lg relative overflow-hidden">
        {file ? (
          <>
            <Image
              src={file}
              alt="Preview image"
              layout="fill"
              className="object-contain"
            />
            <button
              className="absolute inline-flex items-center justify-center top-1 right-1 h-8 w-8 z-10 bg-red-500 rounded-lg"
              onClick={() => setFile(null)}
            >
              x
            </button>
          </>
        ) : (
          <>
            <Label
              htmlFor="upload-input"
              className="ring h-full w-full cursor-pointer flex items-center justify-center"
            >
              Upload a image
            </Label>
            <Input
              type="file"
              id="upload-input"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />
          </>
        )}
      </span>
      <Button onClick={handlePredictImage}>Predict</Button>
      {handledImage && (
        <span className="h-80 w-80 relative rounded-lg overflow-hidden ring-1 ring-gray-300">
          <Image
            src={handledImage}
            alt="Handled image"
            layout="fill"
            className="object-contain"
          />
        </span>
      )}
    </div>
  );
};

export default UploadImage;
