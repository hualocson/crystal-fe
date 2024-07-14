"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ImageSlider({ images = [] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      orientation="vertical"
      className="w-auto max-w-screen-xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      plugins={[plugin.current]}
    >
      <CarouselContent className="-mt-1 h-80">
        {images.map((_, index) => (
          <CarouselItem key={index} className="pt-4 md:basis-1/2">
            <div className="py-1">
              <Card>
                <CardContent className="flex items-center justify-center p-2 relative h-64">
                  <Image src={images[index]} fill alt="image" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-0 -translate-y-full inset-x-0 bg-cyan-600/40 w-full grid grid-cols-4 place-items-center mt-4 backdrop-blur-md capitalize">
        <span>origin</span>
        <span>annotations</span>
        <span>amodal</span>
        <span>visible</span>
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
