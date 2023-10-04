type Props = {
  answers: string[];
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
};

export const Answers = ({ answers, onChange }: Props) => {
  return (
    <>
      {answers.map((value, index) => (
        <div className="mb-[0.125rem] block min-h-[1.5rem]" key={index}>
          <label className="flex items-center bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-2  hover:bg-indigo-300 cursor-pointer ">
            <input type="radio" name="Text" value={value} onChange={onChange} />
            <i className="pl-2 text-xl">{value}</i>
          </label>
        </div>
      ))}
    </>
  );
};
