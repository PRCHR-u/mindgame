"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { categoriesRound1 } from "@/lib/questions";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function Round1() {
  const router = useRouter();
  const [clickedQuestions, setClickedQuestions] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        // Load clicked questions from localStorage on component mount
        const storedClickedQuestions = localStorage.getItem('clickedQuestionsRound1');
        if (storedClickedQuestions) {
            setClickedQuestions(JSON.parse(storedClickedQuestions));
        }
    }, []);

    useEffect(() => {
        // Save clicked questions to localStorage whenever it changes
        localStorage.setItem('clickedQuestionsRound1', JSON.stringify(clickedQuestions));
    }, [clickedQuestions]);

    const handleQuestionClick = (categoryIndex: number, questionIndex: number) => {
      const key = `${categoryIndex}-${questionIndex}`;
      
      // Optimistically update state immediately
      setClickedQuestions(prev => ({ ...prev, [key]: true }));

      // Store the key in localStorage
      let storedClickedQuestions = localStorage.getItem('clickedQuestionsRound1');
      let clickedQuestionsRound1 = storedClickedQuestions ? JSON.parse(storedClickedQuestions) : {};
      clickedQuestionsRound1[key] = true;
      localStorage.setItem('clickedQuestionsRound1', JSON.stringify(clickedQuestionsRound1));

      router.push(`/question?round=round1&category=${categoryIndex}&question=${questionIndex}`);
    };

  const handleBack = () => {
    router.push("/roundselection");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <h1 className="text-4xl font-bold mb-8">Раунд 1</h1>
        <div className="grid grid-cols-5 gap-4 p-4">
            {categoriesRound1.map((category, categoryIndex) => (
                <div key={categoryIndex} className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                    {category.questions.map((question, questionIndex) => {
                        const key = `${categoryIndex}-${questionIndex}`;
                        const isClicked = clickedQuestions[key] || false;
                        return (
                            <Button
                                key={questionIndex}
                                className={`points-button relative ${isClicked ? "disabled" : ""}`}
                                onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
                                disabled={isClicked}
                                aria-label={`Вопрос за ${question.points} баллов, категория ${category.name}`}
                            >
                                {question.points}
                                {isClicked && (
                                    <Lock className="absolute top-1 right-1 text-gray-500" size={16} />
                                )}
                            </Button>
                        );
                    })}
                </div>
            ))}
        </div>
      <Button className="mt-8 button" onClick={handleBack}>
        Вернуться
      </Button>
    </div>
  );
}
