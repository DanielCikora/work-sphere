import { TitleTextDataTypes } from "@/utils/dataTypes/dataTypes";
const Title: React.FC<TitleTextDataTypes> = ({ titleClass, titleText }) => {
  return <h2 className={`font-semibold ${titleClass}`}>{titleText}</h2>;
};
export default Title;
