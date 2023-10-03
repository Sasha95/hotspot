"use client";
import { Card } from "./components/card/Card";
// @ts-ignore
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useSearchParams();

  useEffect(() => {
    const mac = route.get("mac");
    if (mac) {
      setCookie("mac", mac);
    }
  }, [route]);

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 className="text-4xl font-bold my-4">IQMesh</h1>
      <div className="flex p-1 flex-wrap gap-4 justify-center align-middle">
        <Card
          title="Вопрос из самой простой категории"
          description="Не спешите выбирать данную категорию. Вы, скорее всего, ответите правильно, но доступ в интернет вы получите всего на 1 час."
          link="/question?complexity=easy"
        />

        <Card
          title="Вопрос из средней категории сложности"
          description="Отличный выбор, чтоб получить доступ в интернет на 4 часа и проверить свои знания."
          link="/question?complexity=medium"
        />

        <Card
          title="Вопрос из сложной категории"
          description="Если вы настойщий физик/математик, выбирайте эту категорию. Если вы правильно ответите, получите доступ в интернет на 1 день."
          link="/question?complexity=difficult"
        />
      </div>
    </main>
  );
}
