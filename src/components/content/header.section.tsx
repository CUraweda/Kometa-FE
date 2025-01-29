type Props = {
  section?: string;
  title?: string;
  description?: string;
  direction?: "left" | "center";
  className?: string;
  isTextWhite?: boolean;
};

function Header({
  section,
  title,
  description,
  direction = "center",
  isTextWhite = false,
  className,
}: Props) {
  const overrideStyle = isTextWhite
    ? {
      color: "white",
    }
    : undefined;

  return (
    <div
      className={`flex flex-col px-3 ${direction == "left"
          ? "text-left items-start"
          : "items-center text-center"
        } ${className}`}
    >
      <h3 style={overrideStyle} className="tracking-widest text-primary">
        {section}
      </h3>
      <h2
        style={overrideStyle}
        className="font-semibold my-4 text-3xl text-slate-700 tracking-wide"
      >
        {title}
      </h2>
      <p
        style={overrideStyle}
        className="block tracking-wide max-w-3xl text-slate-500 text-balance whitespace-pre-line"
      >
        {description}
      </p>
    </div>
  );
}

export default Header;
