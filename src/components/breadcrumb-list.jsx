import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const MyBreadcrumbList = ({ breadcrumb = [] }) => {
  return (
    <Breadcrumb className="relative z-50">
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <>
            <BreadcrumbItem
              key={index}
              className={cn(index === 0 && "text-cyan-500 font-bold")}
            >
              <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumb.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadcrumbList;
