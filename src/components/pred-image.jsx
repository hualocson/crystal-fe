"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import BorderBox from "./border-box";
import { Button } from "./ui/button";
import UploadImageDialog from "./ui/upload-image-dialog";
import charts from "@/resources/charts";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";

const PredImage = () => {
  const originImage = useReadLocalStorage("origin-image");
  const amodalImage = useReadLocalStorage("amodal-image");
  const visibleImage = useReadLocalStorage("visible-image");
  const chartImage = useReadLocalStorage("chart-image");
  const numInstances = useReadLocalStorage("num-instances");

  const router = useRouter();

  const data = useMemo(() => {
    const res = [];
    for (let i = 0; i < chartImage.length; i++) {
      res.push({
        chartImage: chartImage[i],
        originImage: originImage[i],
        amodalImage: amodalImage[i],
        visibleImage: visibleImage[i],
      });
    }

    return res;
  }, [originImage, amodalImage, visibleImage, chartImage]);

  return (
    <div className="flex gap-2 items-start">
      <BorderBox
        title="Predicted Image"
        customTitleClass={"text-cyan-500 text-center text-xl"}
      >
        <div className="flex flex-col gap-4 p-2 overflow-hidden">
          {originImage.length !== 0 && (
            <BorderBox>
              <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-col items-center gap-2 divide-y divide-black">
                  {data &&
                    data.length > 0 &&
                    data.map((item) => (
                      <div
                        key={item[0]}
                        className="flex flex-col items-center p-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-2 items-center">
                            <span className="size-[350px] relative hover:brightness-125">
                              <Image
                                fill
                                src={item.originImage}
                                alt="Predicted Image"
                                className="object-contain"
                              />
                            </span>
                            <p>Origin</p>
                          </div>
                          <div className="flex flex-col gap-2 items-center">
                            <span className="size-[350px] relative hover:brightness-125">
                              <Image
                                fill
                                src={item.amodalImage}
                                alt="Predicted Image"
                                className="object-contain"
                              />
                            </span>
                            <p>Amodal</p>
                          </div>
                          <div className="flex flex-col gap-2 items-center">
                            <span className="size-[350px] relative hover:brightness-125">
                              <Image
                                fill
                                src={item.visibleImage}
                                alt="Predicted Image"
                                className="object-contain"
                              />
                            </span>
                            <p>Visible</p>
                          </div>
                        </div>

                        <span className="w-[850px] h-[600px] relative">
                          <Image
                            fill
                            src={item.chartImage}
                            alt="Chart Image"
                            className="object-contain"
                          />
                        </span>
                      </div>
                    ))}
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
          {/* <Dialog open={viewImage} onOpenChange={setViewImage}>
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
          </Dialog> */}
        </div>
      </BorderBox>
    </div>
  );
};

export default PredImage;
