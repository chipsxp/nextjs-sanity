import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";

type FAQsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "faqs" }
>;

export function FAQs({ _key, title, faqs }: FAQsProps) {
  return (
    <section className="container mx-auto flex flex-col gap-8 py-16">
      {title ? (
        <h2 className="text-xl mx-auto md:text-2xl lg:text-5xl font-semibold text-slate-800 text-pretty max-w-3xl">
          {title}
        </h2>
      ) : null}
      {Array.isArray(faqs) ? (
        <div className="max-w-2xl mx-auto border-b border-pink-200">
          {faqs.map((faq) => (
            <details
              key={faq._id}
              className="group [&[open]]:bg-pink-50 transition-colors duration-100 px-4 border-t border-pink-200"
              name={_key}
            >
              <summary className="text-xl font-semibold text-slate-800 list-none cursor-pointer py-4 flex items-center justify-between">
                {faq.title}
                <span className="transform origin-center rotate-90 group-open:-rotate-90 transition-transform duration-200">
                  &larr;
                </span>
              </summary>
              <div className="pb-4">
                {faq.body ? <PortableText value={faq.body} /> : null}
              </div>
            </details>
          ))}
        </div>
      ) : null}
    </section>
  );
}
