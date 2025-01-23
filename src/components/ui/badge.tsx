
type Props = {
  color: string;
  label: string;
  background: string;
};

function Badge({ color, background, label }: Props) {
  return (
    <span
      style={{ color: color, background: background }}
      className="px-2 py-2 rounded-lg text-xs tracking-wide"
    >
      {label}
    </span>
  );
}

export default Badge;
