import { Card } from "./components/card/Card";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 className="text-4xl font-bold my-4">IQMesh</h1>
      <div className="flex p-1 flex-wrap gap-4 justify-center align-middle">
        <Card
          title="Вопрос из самой простой категории"
          description="Не спешите выбирать данную категорию. Вы, скорее всего, ответите правильно, но скорость интернета будет оставлять желать лучшего."
          link="/question?complexity=easy"
        />

        <Card
          title="Вопрос из средней категории сложности"
          description="Отличный выбор, чтоб получить хорошую скорость интернета и проверить свои знания."
          link="/question?complexity=medium"
        />

        <Card
          title="Вопрос из сложной категории"
          description="Если вы настойщий физик/математик, выбирайте эту категорию. Если вы правильно ответите, получите максимально возможную скорость."
          link="/question?complexity=difficult"
        />
      </div>
    </main>
  );
}
