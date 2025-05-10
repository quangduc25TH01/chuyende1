const TitleSection = ({
  title,
  isLine = true,
  dataAos,
}: {
  title: string;
  isLine?: boolean;
  dataAos?: string;
}) => {
  return (
    <h2
      className="relative flex items-center w-full justify-center w-full"
      data-aos={dataAos || "flip-left"}
    >
      {isLine && <b className="flex-1 h-[2px] bg-black-1 opacity-10" />}
      <p className="mx-4 text-center">
        {title}
        <img src="/title-main.png" alt="icon" className="mx-auto mt-1" />
      </p>
      {isLine && <b className="flex-1 h-[2px] bg-black-1 opacity-10" />}
    </h2>
  );
};

export default TitleSection;
