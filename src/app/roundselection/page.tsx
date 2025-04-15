"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const rounds = [
  { id: "round1", name: "Раунд 1" },
  { id: "round2", name: "Раунд 2" },
  { id: "final", name: "Финал" },
];

export default function RoundSelection() {
  const router = useRouter();

  const handleRoundClick = (roundId: string) => {
    router.push(`/${roundId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Выбор раунда</h1>
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
