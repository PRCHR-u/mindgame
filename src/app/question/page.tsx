"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { categoriesRound1, categoriesRound2 } from "@/lib/questions";

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerId = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    setTimeLeft(30);
    setShowAnswer(false); // Reset showAnswer when the question changes

    if (timerId.current) {
      clearInterval(timerId.current);
    }

    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerId.current);
          timerId.current = null;
          setShowAnswer(true);
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [questionText]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <h1 className="text-4xl font-bold mb-8">Вопрос</h1>
      <div className="text-2xl font-semibold mb-4 question-text">{questionText}</div>
      <div className="text-xl mb-4">Осталось времени: {timeLeft} секунд</div>
      {!showAnswer && (
        <Button className="mb-4 button" onClick={handleShowAnswer} disabled={timeLeft === 0}>
          Показать ответ
        </Button>
      )}
      {showAnswer && (
        <div className="text-xl">
          Ответ: {answerText}
        </div>
      )}
      <Button className="button" onClick={handleBack}>Вернуться</Button>
    </div>
  );
}

