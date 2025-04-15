"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { categoriesRound1 } from "@/lib/questions";

export default function Round1() {
  const router = useRouter();

  const handleQuestionClick = (categoryIndex: number, questionIndex: number) => {
    router.push(`/question?round=round1&category=${categoryIndex}&question=${questionIndex}`);
  };

  const handleBack = () => {
    router.push("/roundselection");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <h1 className="text-4xl font-bold mb-8">Раунд 1</h1>
      <div className="grid grid-cols-5 gap-4">
        {categoriesRound1.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
            {category.questions.map((question, questionIndex) => (
              <Button
                key={questionIndex}
                className="mb-2 button"
                onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
              >
                {question.points}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <Button className="mt-8 button" onClick={handleBack}>
        Вернуться
      </Button>
    </div>
  );
}
