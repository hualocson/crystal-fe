import BorderBox from "@/components/border-box";
import MyBreadcrumbList from "@/components/breadcrumb-list";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/upload-image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { UploadIcon } from "@radix-ui/react-icons";
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Crystal AI", href: "/crystal-ai" },
];
const CrystalAIPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <MyBreadcrumbList breadcrumb={breadcrumb} />
      <BorderBox title="Crystal AI">
        <div className="p-3 flex flex-col gap-2">
          <p className="text-muted-foreground">
            Choose Photos to Describe with AI
          </p>
          <BorderBox>
            <div className="flex flex-col gap-4 p-2">
              <UploadImage />
            </div>
          </BorderBox>
        </div>
      </BorderBox>
    </div>
  );
};

export default CrystalAIPage;
