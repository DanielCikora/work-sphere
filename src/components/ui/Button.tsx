import { MouseEventHandler } from "react";
interface ButtonDataTypes {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "submit" | "button" | "reset";
}
const Button: React.FC<ButtonDataTypes> = ({
  text,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      className={`text-light-primaryText border-2 border-solid border-black px-2 py-1 rounded font-medium ${className}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
