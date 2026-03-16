import BioSection from "@/components/bio-section";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-20">
      <div className="w-full max-w-5xl px-4">
        <BioSection />
      </div>
    </div>
  );
}
