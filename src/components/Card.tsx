// react
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-md border border-gray-300 bg-white">
      <div className="bg-[#f2f2f6] px-4 py-2 text-[20px]">{title}</div>
      <div className="space-y-4 p-4 text-[16px]">{children}</div>
    </section>
  );
}
