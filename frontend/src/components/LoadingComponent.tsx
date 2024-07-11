import { TailSpin } from "react-loader-spinner";

const LoadingComponent = () => (
  <div className="fixed inset-0  mt-[3.5rem]  flex theme_container items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <TailSpin width={40} height={40} color="red" />
  </div>
);

export default LoadingComponent;
