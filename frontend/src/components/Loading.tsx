import { TailSpin } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin width={40} height={40} color="red" />
    </div>
  );
};

export default Loading;
