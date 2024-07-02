import { TailSpin } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center p-6 items-center h-full w-full">
      <TailSpin width={40} height={40} color="red" />
    </div>
  );
};

export default Loading;
