import { PAGE_QUERYResult } from "@/sanity/types";

type FeaturesProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "features" }
>;

export function Features({ features, title }: FeaturesProps) {
  return (
    <section className="container mx-auto flex flex-col gap-8 py-16">
      {title ? (
        <h2 className="text-xl mx-auto md:text-2xl lg:text-5xl font-semibold text-slate-800 text-pretty max-w-3xl">
          {title}
        </h2>
      ) : null}

      {Array.isArray(features) ? (
        <div className="grid grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature._key} className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="text-lg text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
