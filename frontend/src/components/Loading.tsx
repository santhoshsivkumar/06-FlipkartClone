import { TailSpin } from "react-loader-spinner";
const Loading = ({ width = 40, height = 40, color = "red" }) => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin width={width} height={height} color={color} />
    </div>
  );
};

export default Loading;
