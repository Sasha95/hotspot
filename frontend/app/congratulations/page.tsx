"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";

export default function Congratulations() {
  const macData = getCookie("mac");

  return (
    <div className="text-center h-screen flex flex-col align-middle justify-center">
      <p className="text-2xl">
        Все правильно, теперь вы можете получить доступ в интернет!
      </p>
      <div className="flex flex-col justify-center gap-3 mt-4">
        <Link href={{pathname: '/', query: {mac: macData}}}>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 mt-4 rounded-full"
          >
             Попробовать еще раз
          </button>
         
        </Link>

        <form name="login" action="http://10.5.50.1/login" method="post">
          <input type="hidden" name="username" value={`${macData}`} />
          <input type="hidden" name="password" value={`${macData}`} />
          <button
            type="submit"
            className="bg-green-400 hover:bg-blue-700 text-white font-bold py-4 px-8 mt-4 rounded-full"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
