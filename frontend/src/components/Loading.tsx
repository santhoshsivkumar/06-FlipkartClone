import { TailSpin } from "react-loader-spinner";
const Loading = ({ width = 40, height = 40 }) => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin width={width} height={height} color="red" />
    </div>
  );
};

export default Loading;
