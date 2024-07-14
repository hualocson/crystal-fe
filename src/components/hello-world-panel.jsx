"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const HelloWorldPanel = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 border border-white/15 bg-slate-500/15 p-6 rounded-md max-w-screen-lg">
      <span className="text-4xl font-bold">
        AmoSeg: Công cụ nhận diện tinh thể bị che khuất
      </span>
      <span>
        Ứng dụng nhận diện tinh thể của chúng tôi sử dụng công nghệ học máy tiên
        tiến để xác định và đo kích thước tinh thể, kể cả những phần bị che
        khuất
      </span>
      <span>
        <Button onClick={() => router.push("/crystal-ai")}>Sử dụng thử</Button>
      </span>
    </div>
  );
};

export default HelloWorldPanel;
