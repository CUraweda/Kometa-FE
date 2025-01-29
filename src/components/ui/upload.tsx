import { twMerge } from "tailwind-merge";
import { Image } from "../../assets/icon";

type Props = {
  id: string;
  label: string;
  className?: string;
  onChange: (file: File) => void;
  value: File | string | null;
};

function Upload({ id, label, className, onChange, value }: Props) {
  
  const defaultSource =
    value && typeof value === "string"
      ? value
      : value instanceof File
      ? URL.createObjectURL(value)
      : undefined;

  return (
    <label
      key={id}
      htmlFor={id}
      className={twMerge(
        "w-full h-32 rounded-xl border border-dashed flex justify-center items-center cursor-pointer",
        className
      )}
    >
      <input
        className="hidden"
        id={id}
        type="file"
        onChange={(e) => e.target.files?.length && onChange(e.target.files[0])}
      />
      {defaultSource ? (
        <img
          src={defaultSource}
          alt={`image-${label}`}
          className="object-contain w-full h-full rounded-xl"
        />
      ) : (
        <div className="flex flex-col gap-3 text-center">
          <Image className="w-10 h-10 mx-auto" />
          <p className="text-sm tracking-wide text-slate-500">{label}</p>
        </div>
      )}
    </label>
  );
}

export default Upload;
