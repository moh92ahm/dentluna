"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Globe,
  MoveRight,
  PanelsTopLeft,
  PenTool,
  Brain,
  ShieldCheck,
  UserCheck,
  Phone,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Expert Team",
    description: "Our team of dental professionals is highly skilled and experienced.",
    icon: <UserCheck className="h-auto w-8 md:w-12" />,
  },
  {
    title: "State-of-the-Art Technology",
    description: "We use the latest dental technology to provide the best care.",
    icon: <Brain className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Comfortable Environment",
    description: "Our clinics are designed to make patients feel at ease.",
    icon: <PanelsTopLeft className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Personalized Care",
    description: "We provide individualized treatment plans to meet each patient's unique needs.",
    icon: <PenTool className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Fast & Efficient",
    description: "We provide timely and effective dental treatments.",
    icon: <Zap className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Safe & Reliable",
    description: "We prioritize patient safety and adhere to the highest standards of dental care.",
    icon: <ShieldCheck className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Long-Lasting Support",
    description: "We offer comprehensive aftercare and support to ensure long-term dental health.",
    icon: <Phone className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Language Support",
    description: "We offer multilingual support to cater to patients from diverse backgrounds.",
    icon: <Globe className="h-auto w-8 md:w-12" />,
  },
];

interface Feature114Props {
  className?: string;
}

const Feature114 = ({ className }: Feature114Props) => {
  return (
    <section className={cn("py-32 container mx-auto ", className)}>
      <div className="container">
        <div className="grid items-center gap-20 md:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <h1 className="text-3xl font-semibold md:text-5xl">
              WHY PATIENTS CHOOSE US
            </h1>
            <p className="text-muted-foreground md:text-lg">
              At DentLuna, we are committed to providing exceptional dental care that combines advanced technology, personalized treatment plans, and a compassionate approach. Our patients choose us for our dedication to their oral health, our experienced team of dental professionals, and our welcoming environment that prioritizes comfort and trust.
            </p>
            <Button size="lg" className="w-fit gap-2">
              Get Started <MoveRight className="h-auto w-5" />
            </Button>
            <div className="grid grid-cols-2 justify-between gap-4 pt-10 text-left md:gap-20">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">85%</h2>
                <p className="text-muted-foreground md:text-lg">
                  Patient Satisfaction
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">15k+</h2>
                <p className="text-muted-foreground md:text-lg">
                  Happy Patients
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:gap-7 lg:grid-cols-2">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative lg:hidden"
            >
              <CarouselContent className="max-h-[600px]">
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-5 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features
                  .slice(0, features.length / 2)
                  .map((feature, index) => (
                    <CarouselItem key={index}>
                      <div className="flex flex-col rounded-xl border p-4 md:p-7">
                        {feature.icon}
                        <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground md:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature114 };
