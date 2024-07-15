"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./ui/button";
const getBase64 = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const UploadImage = () => {
  const inputRef = useRef();
  const [imgsSrc, setImgsSrc] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const router = useRouter();
  const [originImage, setOriginImage, removeOriginImage] = useLocalStorage(
    "origin-image",
    []
  );

  const [amodalImage, setAmodalImage, removeAmodalImage] = useLocalStorage(
    "amodal-image",
    []
  );
  const [visibleImage, setVisibleImage, removeVisibleImage] = useLocalStorage(
    "visible-image",
    []
  );

  const [chartsImage, setChartsImage, removeChartsImage] = useLocalStorage(
    "chart-image",
    []
  );

  const [numInstances, setNumInstances, removeNum] = useLocalStorage(
    "num-instances",
    {
      visible: 0,
      amodal: 0,
    }
  );

  const [loading, setLoading] = useState(false);

  const handleResponse = (
    originFile,
    amodalBase64,
    visibleBase64,
    chartsBase64,
    numInstance
  ) => {
    getBase64(originFile).then((base64) => {
      setOriginImage((x) => [...x, base64]);
    });

    setAmodalImage((x) => [...x, amodalBase64]);
    setVisibleImage((x) => [...x, visibleBase64]);
    setChartsImage((x) => [...x, chartsBase64]);
    setNumInstances((x) => ({
      visible: x.visible + numInstance.visible,
      amodal: x.amodal + numInstance.amodal,
    }));
  };

  async function handlePredictImage(e) {
    removeAmodalImage();
    removeOriginImage();
    removeVisibleImage();
    removeNum();
    removeChartsImage();
    setLoading(true);
    try {
      const formData = new FormData();
      const selectedImage = imgsSrc[0];
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
      const chartsImageBase64 = data.chartImage;
      const { numAmodalInstances, numVisibleInstances } = data;
      const amodalImage = `data:image/jpg;base64,${amodalImageBase64}`;
      const visibleImage = `data:image/jpg;base64,${visibleImageBase64}`;
      const chartsImage = `data:image/jpg;base64,${chartsImageBase64}`;
      handleResponse(selectedImage, amodalImage, visibleImage, chartsImage, {
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

  async function handlePredictImages(e) {
    setLoading(true);

    removeAmodalImage();
    removeOriginImage();
    removeVisibleImage();
    removeNum();
    removeChartsImage();
    try {
      const jobs = imgsSrc.map(async (image_file) => {
        const formData = new FormData();
        console.log({ image_file });
        formData.append("image", image_file);
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to send image");
        }
        return response.json();
      });

      const data = await Promise.all(jobs);
      data.forEach((data, index) => {
        const amodalImageBase64 = data.amodalImage;
        const visibleImageBase64 = data.visibleImage;
        const chartsImageBase64 = data.chartImage;
        const { numAmodalInstances, numVisibleInstances } = data;
        const amodalImage = `data:image/jpg;base64,${amodalImageBase64}`;
        const visibleImage = `data:image/jpg;base64,${visibleImageBase64}`;
        const chartsImage = `data:image/jpg;base64,${chartsImageBase64}`;
        handleResponse(imgsSrc[index], amodalImage, visibleImage, chartsImage, {
          visible: numVisibleInstances,
          amodal: numAmodalInstances,
        });
      });
      router.push("/crystal-ai/pred-image");
    } catch (error) {
      console.error("Error sending image:", error);
    } finally {
      setLoading(false);
    }
  }

  const onUploadMultiple = (e) => {
    const files = e.target.files;
    for (const file of files) {
      const url = URL.createObjectURL(file);
      setImgsSrc((imgs) => [...imgs, file]);
      setSelectedImages((imgs) => [...imgs, url]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500"
            onClick={() => {
              inputRef.current && inputRef.current.click();
            }}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Upload Image(s)
          </Button>
        </div>
        <span className="flex h-80 w-full border-y border-black/15 items-center justify-center relative overflow-hidden gap-2">
          {}
          {imgsSrc.length !== 0 ? (
            <>
              {selectedImages.map((link) => (
                <span
                  key={link}
                  className="h-80 w-80 relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={link}
                    alt="Handled image"
                    fill
                    className="object-contain"
                  />
                </span>
              ))}
              <button
                className="absolute inline-flex items-center justify-center top-1 right-1 h-8 w-8 z-10 bg-red-500 rounded-lg"
                onClick={() => setImgsSrc([])}
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
                onChange={onUploadMultiple}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </>
          )}
        </span>
        <Button
          disabled={imgsSrc.length === 0 || loading}
          onClick={
            imgsSrc.length === 1 ? handlePredictImage : handlePredictImages
          }
        >
          {loading ? "Loading..." : "Predict Image(s)"}
        </Button>
      </div>
    </>
  );
};

export default UploadImage;
