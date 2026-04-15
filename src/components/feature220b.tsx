import { ArrowRight } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Feature220bProps {
  className?: string;
}

const Feature220b = ({ className }: Feature220bProps) => {
  return (
    <section
      className={cn(
        "bg-card container mx-auto p-20 rounded-2xl justify-center flex",
        className,
      )}
    >
      <div className="container">
        {/* Content and Video Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Video Left */}
          <div className="order-2 lg:order-1">
            <AspectRatio
              ratio={1.5}
              className="overflow-hidden rounded-2xl"
            >
              <video
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
                className="block size-full object-cover object-center"
                loop
                autoPlay
                muted
                controls={false}
              />
            </AspectRatio>
          </div>

          {/* Content Right */}
          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              WHY IZIMIR?
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Izmir is one of the most preferred cities for dental treatments, offering:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground md:text-xl">
              <li>World-class dental clinics with state-of-the-art technology.</li>
              <li>Highly skilled dentists with international experience.</li>
              <li>Affordable treatment options without compromising quality.</li>
              <li>A vibrant city with rich culture and beautiful coastal views.</li>
            </ul>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Experience top-tier dental care in a city that combines medical excellence with an unforgettable travel experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature220b };
