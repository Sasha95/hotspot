import { getCookie } from "cookies-next";
import Link from "next/link";

export default function Fail() {
  const macData = getCookie("mac");

  return (
    <div className="text-center min-h-[400px] flex flex-col align-middle justify-center">
      <p className="text-xl">К сожалению, вы ответили неправильно</p>
      <Link href={{ pathname: "/", query: { mac: macData } }}>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 mt-4 rounded-full"
        >
          Попробовать еще раз
        </button>
      </Link>
    </div>
  );
}
