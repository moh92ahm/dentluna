"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const services: ServiceProps[] = [
  {
    title: "Veneers & Smile Design",
    description:
      "Achieve a brighter, more confident smile",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
  },
  {
    title: "Full Mouth Restoration",
    description:
      "Comprehensive solutions for complex dental cases",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
  },
  {
    title: "Dental Implants",
    description:
      "Permanent and reliable solution for missing teeth",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
  },
  {
    title: "Zirconium Crowns",
    description:
      "Strong, aesthetic, and natural-looking restorations",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
  },
];

interface ServicesHomeProps {
  className?: string;
}

const ServicesHome = ({ className }: ServicesHomeProps) => {
  return (
    <section className={cn("py-32 flex justify-center", className)}>
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* <section className={cn("flex min-h-screen items-center", className)}>
      <div className="container grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2"> */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Our Treatments
            </h2>
            <h4 className="mb-8 text-lg text-foreground">
              Advanced Dental Solutions Designed for You
            </h4>
            <p className="w-80 text-base tracking-tight text-muted-foreground">
              From routine cleanings to complex restorations, our comprehensive dental services are tailored to meet your unique needs and ensure a healthy, radiant smile.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            Explore All Services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div>
                    <div className="font-semibold text-white">
                      {service.title}
                    </div>
                    <div className="mt-1 text-sm text-white/90">
                      {service.description}
                    </div>
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ServicesHome };
