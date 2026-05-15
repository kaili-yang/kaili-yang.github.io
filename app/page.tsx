import BioSection from "@/components/bio-section";
import { ExternalLinkIcon } from "lucide-react";

const products = [
  {
    name: "comfy-workflow-debugger",
    url: "https://comfy-workflow-debugger.netlify.app/",
    description:
      "A visual debugging tool for ComfyUI workflows. Inspect node connections, trace data flow, and pinpoint errors in complex graphs without manual console digging.",
  },
  {
    name: "Let's Comfy",
    url: "https://letscomfy.netlify.app/guides/basic/",
    description:
      "A beginner-friendly guide series that walks you through ComfyUI from the ground up — covering core concepts, practical workflows, and best practices.",
  },
];

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-20">
      <div className="w-full max-w-5xl px-4">
        <BioSection />

        <section className="mt-4">
          <h2 className="text-2xl font-bold tracking-tight mb-6">My Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 rounded-2xl bg-stone-50/60 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <ExternalLinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
