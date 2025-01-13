type Props = { title: string; description: string };

function Header({ title, description }: Props) {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-1 text-slate-600">{title}</h2>
      <p className="text-slate-500">{description}</p>
    </>
  );
}

export default Header;
