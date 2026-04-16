import { cn } from "@/lib/utils";

interface Feature61Props {
  className?: string;
}

const Feature61 = ({ className }: Feature61Props) => {
  return (
    <section className={cn("py-32 mx-auto flex justify-center", className)}>
      <div className="container">
        <div className="flex-row-reverse lg:flex">
          <div className="lg:w-1/2">
            <div className="mb-6 md:mb-8 lg:mb-0">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder hero"
                className="aspect-4/3 w-full rounded-md border border-border object-cover"
              />
            </div>
          </div>
          <div className="lg:flex lg:w-1/2 lg:items-center lg:pr-24 2xl:pr-32">
            <div>
              <h3 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                QUALITY & MATERIALS
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                We use only high-quality materials from internationally recognized manufacturers, all meeting strict European and global standards.
              </p>
              <p className="text-muted-foreground lg:text-lg">
                We work with leading dental brands from Germany, Switzerland, the United States, and South Korea — allowing us to choose the most suitable option for each patient.
              </p>
              <p className="text-muted-foreground lg:text-lg">
                Every material is <strong>fully traceable</strong>, ensuring safety, consistency, and long-term success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature61 };
