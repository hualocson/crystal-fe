import MyBreadcrumbList from "@/components/breadcrumb-list";
import PredImage from "@/components/pred-image";
import React from "react";
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Crystal AI", href: "/crystal-ai" },
  { name: "Predicted", href: "/crystal-ai/pred-image" },
];
const PredImagePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <MyBreadcrumbList breadcrumb={breadcrumb} />
      <PredImage />
    </div>
  );
};

export default PredImagePage;
