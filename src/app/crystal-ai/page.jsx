import BorderBox from "@/components/border-box";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/upload-image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { UploadIcon } from "@radix-ui/react-icons";

const CrystalAIPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <BorderBox title="Crystal AI">
        <div className="p-3 flex flex-col gap-2">
          <p className="text-muted-foreground">
            Choose Photos to Describe with AI
          </p>
          <BorderBox>
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="border-cyan-500 text-cyan-500"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Upload Image(s)
                </Button>
                <Button variant="outline" className="border-white/75">
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload Directory
                </Button>
              </div>

              <UploadImage />
            </div>
          </BorderBox>
        </div>
      </BorderBox>
    </div>
  );
};

export default CrystalAIPage;
