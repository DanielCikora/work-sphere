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
    <dialog className='fixed w-dvw h-dvh bg-black bg-opacity-[0.02] inset-0 md:pb-4 md:pt-20 pt-[66px] md:px-8 z-10 grid place-items-center'>
      <div
        className={`sm:rounded w-fit h-fit relative z-50 dark:bg-gray-700 bg-white sm:px-20 px-[20px] md:py-6 py-2 ${className}`}
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
