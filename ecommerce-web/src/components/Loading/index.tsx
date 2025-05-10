import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ILoading {
  className?: string;
  message?: string;
}

const Loading = (props: ILoading) => {
  const { className, message } = props;

  return (
    <div className={`text-center w-full ${className && className}`}>
      <AiOutlineLoading3Quarters
        className="text-main text-4xl"
        size={40}
        style={{
          animation: "spin 1s linear infinite",
        }}
      />
      {message && (
        <p className="text-back-1 text-sm mt-3 opacity-60 font-avenirBookOblique">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
