import { PropsWithChildren } from "react";

export function Title(props: PropsWithChildren) {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold justify-center text-pretty max-w-5xl">
      {props.children}
    </h1>
  );
}
