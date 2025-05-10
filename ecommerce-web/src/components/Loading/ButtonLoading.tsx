import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ILoading {
  className?: string;
}

const ButtonLoading = (props: ILoading) => {
  const { className } = props;

  return (
    <div className={`text-center w-full ${className && className}`}>
      <AiOutlineLoading3Quarters
        className="text-whites"
        size={20}
        style={{
          animation: 'spin 1s linear infinite',
        }}
      />
    </div>
  );
};

export default ButtonLoading;
