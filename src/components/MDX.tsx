import { useMDXComponent } from "next-contentlayer/hooks";

export function MDX({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-zinc dark:prose-invert">
      <Component />
    </div>
  );
}

















