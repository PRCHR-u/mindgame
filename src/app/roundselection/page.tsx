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
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <h1 className="text-4xl font-bold mb-8">Выбор раунда</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rounds.map((round) => (
          <Button
            key={round.id}
            className="w-64 mb-4 text-lg font-semibold button"
            onClick={() => handleRoundClick(round.id)}
          >
            {round.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

