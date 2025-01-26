import React from "react";

type Props = { children: React.ReactNode; className?: string; id?: string };

function Container({ id, children, className }: Props) {
  return (
    <div id={id} className={`max-w-screen-xl mx-auto ${className}`}>{children}
    </div>
  );
}

export default Container;
