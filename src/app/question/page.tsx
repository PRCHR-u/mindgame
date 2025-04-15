
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { categoriesRound1, categoriesRound2 } from "@/lib/questions";

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const round = searchParams.get("round");
  const categoryIndex = searchParams.get("category");
  const questionIndex = searchParams.get("question");

  useEffect(() => {
    if (!round || !categoryIndex || !questionIndex) {
      return;
    }

    const categoryIndexNum = parseInt(categoryIndex, 10);
    const questionIndexNum = parseInt(questionIndex, 10);

    let questions;
    if (round === "round1") {
      questions = categoriesRound1;
    } else if (round === "round2") {
      questions = categoriesRound2;
    }

    if (questions) {
      const category = questions[categoryIndexNum];
      if (category && category.questions) {
        const question = category.questions[questionIndexNum];
        if (question) {
          setQuestionText(question.text);
          setAnswerText(question.answer);
        } else {
          console.warn("Question not found");
          setQuestionText("Question not found");
          setAnswerText("");
        }
      } else {
        console.warn("Category not found");
        setQuestionText("Category not found");
        setAnswerText("");
      }
    }
  }, [round, categoryIndex, questionIndex]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Вопрос</h1>
      <div className="text-2xl font-semibold mb-4">{questionText}</div>
      {!showAnswer && (
        <Button className="mb-4" onClick={handleShowAnswer}>
          Показать ответ
        </Button>
      )}
      {showAnswer && (
        <div className="text-xl">
          Ответ: {answerText}
        </div>
      )}
      <Button onClick={handleBack}>Вернуться</Button>
    </div>
  );
}
