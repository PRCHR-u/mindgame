"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { finalQuestion } from "@/lib/questions";
import { Input } from "@/components/ui/input";

export default function FinalRound() {
  const router = useRouter();
  const [showAnswer, setShowAnswer] = useState(false);
  const [stake, setStake] = useState("");

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleBack = () => {
    router.push("/roundselection");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <h1 className="text-5xl font-bold mb-8">Финальный Раунд</h1>
      <div className="mb-4">
        <label htmlFor="stake" className="block text-lg font-semibold mb-2">
          Поле для ставки:
        </label>
        <Input
          type="number"
          id="stake"
          className="w-64 text-black"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
        />
      </div>
      <div className="text-2xl font-semibold mb-4 question-text">{finalQuestion.text}</div>
      {!showAnswer && (
        <Button className="mb-4 button" onClick={handleShowAnswer}>
          Показать ответ
        </Button>
      )}
      {showAnswer && (
        <div className="text-xl">
          Ответ: {finalQuestion.answer}
        </div>
      )}
      <Button className="button" onClick={handleBack}>Вернуться</Button>
    </div>
  );
}

