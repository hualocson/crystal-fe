"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "./ui/button";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const UploadImage = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(); // [1
  const [handledImage, setHandledImage] = useState();
  const router = useRouter();
  const [originImage, setOriginImage] = useLocalStorage("origin-image", "");
  const [amodalImage, setAmodalImage] = useLocalStorage("amodal-image", "");
  const [visibleImage, setVisibleImage] = useLocalStorage("visible-image", "");

  const [numInstances, setNumInstances] = useLocalStorage("num-instances", {
    visible: 0,
    amodal: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(file);
  }

  const handleResponse = (
    originFile,
    amodalBase64,
    visibleBase64,
    numInstance
  ) => {
    getBase64(originFile).then((base64) => {
      setOriginImage(base64);
    });

    setAmodalImage(amodalBase64);
    setVisibleImage(visibleBase64);
    setNumInstances(numInstance);
  };

  async function handlePredictImage(e) {
    setLoading(true);
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
      const data = await response.json();
      // data is object with key 'image' is base64 string, and numInstances is number
      const amodalImageBase64 = data.amodalImage;
      const visibleImageBase64 = data.visibleImage;
      const { numAmodalInstances, numVisibleInstances } = data;
      const amodalImage = `data:image/jpg;base64,${amodalImageBase64}`;
      const visibleImage = `data:image/jpg;base64,${visibleImageBase64}`;
      // const url = URL.createObjectURL(imageData);
      // setHandledImage(url);
      handleResponse(selectedImage, amodalImage, visibleImage, {
        visible: numVisibleInstances,
        amodal: numAmodalInstances,
      });
      router.push("/crystal-ai/pred-image");
    } catch (error) {
      console.error("Error sending image:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500"
            onClick={() => {
              setFile(null);
              setSelectedImage(null);
              inputRef.current && inputRef.current.click();
            }}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Upload Image(s)
          </Button>
          <Button variant="outline" className="border-black/75">
            <UploadIcon className="w-4 h-4 mr-2" />
            Upload Directory
          </Button>
        </div>
        <span className="flex h-80 w-full border-y border-black/15 items-center justify-center relative overflow-hidden">
          {file ? (
            <>
              <Image
                src={file}
                alt="Preview image"
                fill
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
                className="ring h-full w-full cursor-pointer flex items-center justify-center flex-col gap-2"
                ref={inputRef}
              >
                <DocumentPlusIcon className="h-8 w-8 text-cyan-500" />
                Click to add image
              </Label>
              <Input
                type="file"
                id="upload-input"
                className="hidden"
                onChange={handleChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </>
          )}
        </span>
        <Button
          disabled={!selectedImage || loading}
          onClick={handlePredictImage}
        >
          {loading ? "Loading..." : "Predict Image"}
        </Button>
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
    </>
  );
};

export default UploadImage;
