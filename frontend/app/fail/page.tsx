import Link from "next/link";

export default function Fail() {
  return (
    <div className="text-center h-screen flex flex-col align-middle justify-center">
      <p className="text-xl">К сожалению, вы ответили неправильно</p>
      <Link href="/" className="text-2xl mt-4 cursor-pointer text-blue-700">
        Попробовать снова
      </Link>
    </div>
  );
}
