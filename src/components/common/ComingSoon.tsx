import { Rocket } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="bg-indigo-50 p-6 rounded-full shadow-sm ring-4 ring-white">
        <Rocket className="h-12 w-12 text-indigo-500 animate-pulse" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          {title} is Coming Soon
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We are actively working on building this module. We can't wait to show you what we've been working on!
        </p>
      </div>
    </div>
  );
}
