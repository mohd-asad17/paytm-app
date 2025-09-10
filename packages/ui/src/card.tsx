import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border p-4">
      <h2 className="text-xl border-b pb-2">
        {title}
      </h2>
      <p>
        {children}
      </p>
    </div>
  );
}
