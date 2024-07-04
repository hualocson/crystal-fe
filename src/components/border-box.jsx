import { cn } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";

const BorderBox = ({ color = "default", title = "", children }) => {
  const borderColor = useMemo(() => {
    switch (color) {
      case "default":
        return "border-white/75";
      case "primary":
        return "border-cyan-500";
      default:
        return "border-white/75";
    }
  }, [color]);
  return (
    <div
      className={cn(
        "relative before:absolute before:inset-y-0 before:inset-x-3 before:border-y after:absolute after:inset-x-0 after:inset-y-3 after:border-x",
        {
          "after:border-cyan-500 before:border-cyan-500": color === "primary",
          "after:border-white/45 before:border-white/45": color === "default",
        }
      )}
    >
      <div>
        {title !== "" && (
          <div
            className={cn(
              "border-b border-white/45",
              color === "primary" && "border-cyan-500"
            )}
          >
            <p className="text-cyan-500 font-bold p-2 text-sm">{title}</p>
          </div>
        )}
        <div className="p-2">{children}</div>
      </div>
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute top-0 left-0 size-2 border-t-2 border-l-2",
            borderColor
          )}
        ></div>
        <div
          className={cn(
            "absolute size-2 top-0 right-0 border-t-2 border-r-2",
            borderColor
          )}
        ></div>
        <div
          className={cn(
            "absolute size-2 bottom-0 left-0 border-b-2 border-l-2 ",
            borderColor
          )}
        ></div>
        <div
          className={cn(
            "absolute size-2 bottom-0 right-0 border-b-2 border-r-2",
            borderColor
          )}
        ></div>
      </div>
    </div>
  );
};

export default BorderBox;
