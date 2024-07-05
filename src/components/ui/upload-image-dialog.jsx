import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadImage from "../upload-image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Label } from "./label";
import { Input } from "./input";

const UploadImageDialog = () => {
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(); // [1
  function handleChange(e) {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(file);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="border-cyan-500 text-cyan-500">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:rounded-none border-white/15">
        <DialogHeader>
          <DialogTitle>Add image - Select file(s)</DialogTitle>
          <span className="w-full h-0.5 bg-slate-400"></span>
          <DialogDescription>
            <p className="text-xl">Please select:</p>
            <p>Choose a .PNG or .JPG file up to 10 MB</p>
          </DialogDescription>
          <span className="w-full h-0.5 bg-slate-400"></span>
          <div>
            <Label
              htmlFor="upload-input"
              className="ring-1 ring-white/15 h-full min-h-44 w-full cursor-pointer flex items-center justify-center flex-col gap-2"
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
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageDialog;
