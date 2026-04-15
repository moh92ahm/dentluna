import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature115Props {
  className?: string;
}

const Feature115 = ({ className }: Feature115Props) => {
  // Define features data for mapping
  const features = [
    {
      title: "Interface",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "User-Friendly Interface",
      },
    },
    {
      title: "Analytics",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
        alt: "Advanced Analytics",
      },
    },
    {
      title: "Integration",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "Seamless Integration",
      },
    },
    {
      title: "Customizable",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
        alt: "Customizable Features",
      },
    },
    {
      title: "Support",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "Reliable Support",
      },
    },
    {
      title: "Security",
      category: "Category",
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
        alt: "Secure Data Management",
      },
    },
  ];

  return (
    <section className={cn("py-32 flex justify-center", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge variant="outline">Our Doctors</Badge>
          <h1 className="text-3xl font-semibold md:text-5xl">Meet Our Doctors</h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Our team of experienced dentists is dedicated to providing exceptional care and personalized treatment plans to ensure your oral health and a confident smile.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none bg-muted/60">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold md:text-2xl">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground md:text-lg">
                  {feature.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-7 pb-7">
                <img
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="w-full rounded-xl object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature115 };
