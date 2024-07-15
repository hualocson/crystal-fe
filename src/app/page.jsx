import BorderBox from "@/components/border-box";
import HelloWorldPanel from "@/components/hello-world-panel";
import { ImageSlider } from "@/components/project-showcases/image-slider";

import images from "@/resources";
import charts from "@/resources/charts";
import Image from "next/image";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-10 z-50 relative">
      <HelloWorldPanel />
      <BorderBox>
        <div className="p-4">
          <ImageSlider images={images} />
        </div>
        <div className="mt-10 flex items-start justify-between">
          {charts
            .filter((i) => i.id !== 3)
            .map((chart, indx) => (
              <BorderBox key={chart.id} title={chart.title} color="primary">
                <Image
                  src={chart.image}
                  alt={chart.title}
                  width={800}
                  height={800}
                />
              </BorderBox>
            ))}
        </div>
      </BorderBox>
    </div>
  );
};

export default MainPage;
