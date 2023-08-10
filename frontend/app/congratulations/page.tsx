import Link from "next/link";

export default function Congratulations() {
  return (
    <div className="text-center h-screen flex flex-col align-middle justify-center">
      <p className="text-2xl">
        Все правильно, теперь у тебя есть доступ в интернет!
      </p>
      <Link href="/" className="text-2xl mt-2 cursor-pointer text-blue-700">
        На главную
      </Link>
    </div>
  );
}
