import { Calendar, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArchiveServiceProps {
  className?: string;
}

const ArchiveService = ({ className }: ArchiveServiceProps) => {
  return (
    <section className={cn("py-32 flex justify-center", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">Services</Badge>
          <h1 className="text-4xl font-semibold text-balance">
            Discover our range of services
          </h1>
          <p className="text-muted-foreground">
            Explore our comprehensive dental services designed to meet all your oral health needs. From routine check-ups to advanced cosmetic procedures, we offer personalized care for a healthy and beautiful smile.
          </p>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Business
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                How to build a successful brand and business
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Building a successful brand and business requires a combination of strategic planning, effective marketing, and a deep understanding of your target audience. By creating a strong brand identity, delivering exceptional products or services, and fostering meaningful connections with customers, you can establish a thriving business that stands out in the competitive market.
              </p>
              <div className="flex justify-between gap-6 text-sm">
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Design
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                The difference between UI and UX
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                UI (User Interface) and UX (User Experience) are two distinct but closely related concepts in design. UI focuses on the visual and interactive elements of a product, such as buttons, icons, and layout, while UX encompasses the overall experience a user has when interacting with a product, including usability, accessibility, and satisfaction. Both UI and UX are essential for creating successful products that meet user needs and expectations.
              </p>
              <div className="flex justify-between gap-6 text-sm">
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Marketing
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                Optimizing your website for SEO and getting more traffic
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                SEO (Search Engine Optimization) is crucial for increasing your website's visibility and attracting more visitors. By optimizing your website's content, structure, and performance, you can improve your search engine rankings and drive more organic traffic. Effective SEO strategies include keyword research, on-page optimization, link building, and regular performance analysis.
              </p>
              <div className="flex justify-between gap-6 text-sm">
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ArchiveService };
