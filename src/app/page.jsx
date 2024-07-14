import BorderBox from "@/components/border-box";
import HelloWorldPanel from "@/components/hello-world-panel";
import { ImageSlider } from "@/components/project-showcases/image-slider";

import images from "@/resources";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-10 z-50 relative">
      <HelloWorldPanel />
      <BorderBox>
        <div className="p-4">
          <ImageSlider images={images} />
        </div>
      </BorderBox>
    </div>
  );
};

export default MainPage;
