"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const rounds = [
  { id: "round1", name: "Раунд 1" },
  { id: "round2", name: "Раунд 2" },
  { id: "final", name: "Финал" },
];

function RoundSelection() {
  const router = useRouter();

  const handleRoundClick = (roundId: string) => {
    router.push(`/${roundId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {rounds.map((round) => (
        <Button
          key={round.id}
          className="w-64 mb-4 text-lg font-semibold"
          onClick={() => handleRoundClick(round.id)}
        >
          {round.name}
        </Button>
      ))}
    </div>
  );
}

function GameRules() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Правила игры</CardTitle>
        <CardDescription>Краткое описание правил викторины</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          <li>Выбирайте категории и вопросы.</li>
          <li>Отвечайте на выбранные вопросы.</li>
          <li>В конце вас ждет финальный вопрос.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const router = useRouter();

  const handleStartGame = () => {
    // Clear local storage
    localStorage.removeItem('clickedQuestionsRound1');
    localStorage.removeItem('clickedQuestionsRound2');
    router.push("/roundselection");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Своя игра</h1>
      <Button className="w-64 mb-4 text-lg font-semibold" onClick={handleStartGame}>
        Начать игру
      </Button>
      <GameRules />
    </div>
  );
}
