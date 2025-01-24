import { MouseEventHandler, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
interface ModalDataTypes {
  className: string;
  closeModal: MouseEventHandler<HTMLButtonElement>;
  ref: any;
}
const Modal: React.FC<PropsWithChildren<ModalDataTypes>> = ({
  className,
  closeModal,
  children,
  ref,
}) => {
  return (
    <dialog className='fixed w-dvw h-dvh bg-black bg-opacity-[0.02] inset-0 md:pb-4 md:pt-20 py-2 md:px-8 px-2 z-10 grid place-items-center'>
      <div
        className={`rounded w-fit h-fit relative z-50 dark:bg-gray-700 bg-white px-20 py-6 ${className}`}
        ref={ref}
      >
        <button
          className='absolute top-1 right-2 text-black hover:text-red-500'
          type='button'
          onClick={closeModal}
        >
          <FontAwesomeIcon className='block text-4xl' icon={faXmark} />
        </button>
        {children}
      </div>
    </dialog>
  );
};
export default Modal;
