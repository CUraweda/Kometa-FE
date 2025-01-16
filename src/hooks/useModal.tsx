import Modal from "../component/ui/modal";

export const useModal = () => {
  return {
    openModal: (id: string) =>
      (document.getElementById(id) as HTMLDialogElement).showModal(),
    closeModal: (id: string) =>
      (document.getElementById(id) as HTMLDialogElement).close(),
    Modal,
  };
};
