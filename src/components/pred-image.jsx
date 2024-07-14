"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import BorderBox from "./border-box";
import { Button } from "./ui/button";
import UploadImageDialog from "./ui/upload-image-dialog";

const PredImage = () => {
  const originImage = useReadLocalStorage("origin-image");
  const amodalImage = useReadLocalStorage("amodal-image");
  const visibleImage = useReadLocalStorage("visible-image");
  const numInstances = useReadLocalStorage("num-instances");

  const router = useRouter();
  const [viewImage, setViewImage] = useState(false);
  const [imageShow, setImageShow] = useState("");

  return (
    <div className="flex gap-2 items-start">
      <BorderBox
        title="Predicted Image"
        customTitleClass={"text-cyan-500 text-center text-xl"}
      >
        <div className="flex flex-col gap-4 p-2 max-h-screen overflow-hidden">
          {originImage && (
            <BorderBox>
              <div className="flex items-center gap-2 justify-evenly">
                <div className="flex flex-col gap-2 items-center">
                  <button
                    className="size-[250px] relative hover:brightness-125"
                    onClick={() => {
                      setImageShow("origin");
                      setViewImage(true);
                    }}
                  >
                    <Image
                      fill
                      src={originImage}
                      alt="Predicted Image"
                      className="object-contain"
                    />
                  </button>
                  <p>Origin</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button
                    className="size-[250px] relative hover:brightness-125"
                    onClick={() => {
                      setImageShow("amodal");
                      setViewImage(true);
                    }}
                  >
                    <Image
                      fill
                      src={amodalImage}
                      alt="Predicted Image"
                      className="object-contain"
                    />
                  </button>
                  <p>Amodal</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button
                    className="size-[250px] relative hover:brightness-125"
                    onClick={() => {
                      setImageShow("visible");
                      setViewImage(true);
                    }}
                  >
                    <Image
                      fill
                      src={visibleImage}
                      alt="Predicted Image"
                      className="object-contain"
                    />
                  </button>
                  <p>Visible</p>
                </div>
              </div>
            </BorderBox>
          )}

          <BorderBox color="primary" title="Description">
            <p className="text-slate-400">This is the predicted image.</p>
            <p>Number of amodal crystal in image: {numInstances.amodal}</p>
            <p>Number of visible crystal in image: {numInstances.visible}</p>
          </BorderBox>
        </div>
      </BorderBox>
      <BorderBox
        title="Action"
        color="primary"
        customTitleClass={"text-cyan-500 text-center text-xl"}
      >
        <div className="flex items-center gap-2 p-4">
          <UploadImageDialog />
          <Button variant="ghost" onClick={() => router.push("/crystal-ai")}>
            Back
          </Button>
          <Dialog open={viewImage} onOpenChange={setViewImage}>
            <DialogContent className="h-screen max-w-full backdrop-blur-md bg-white/5 border-none flex items-center justify-center z-[100]">
              <span className="size-full relative">
                <Image
                  fill
                  src={
                    imageShow === "origin"
                      ? originImage
                      : imageShow === "visible"
                        ? visibleImage
                        : amodalImage
                  }
                  alt="Predicted Image"
                  className="object-contain"
                />
              </span>
            </DialogContent>
          </Dialog>
        </div>
      </BorderBox>
    </div>
  );
};

export default PredImage;
