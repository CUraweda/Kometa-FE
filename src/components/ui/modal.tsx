import { ReactNode } from "react";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  width?: string;
  alignTitle?: "left" | "center";
};

function Modal({ id, width, title, children, alignTitle = "center" }: Props) {
  return (
    <dialog id={id} className="modal">
      <div className={`modal-box ${width ?? ""}`}>
        <form method="dialog">
          <button
            title="Press ESC key to close"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {title ? (
          <h3
            className={`font-bold text-lg ${
              alignTitle == "left" ? "text-left" : "text-center"
            }`}
          >
            {title}
          </h3>
        ) : null}
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
