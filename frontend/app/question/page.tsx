"use client";
const qs = require("qs");
import React, { useEffect, useState } from "react";

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { checkAnswer, getQuestion } from "../api/question/action";
import { useRouter } from "next/navigation";
import { Answers } from "./Answers";
import { getCookie } from "cookies-next";

export type Complexity = "easy" | "medium" | "difficult";

export type Question = {
  id: number;
  task: string;
  source: string | null;
  complexity: Complexity;
  answers: Record<string, string>;
  correct_answer: string;
};

export type Data = {
  id: number;
  attributes: Question;
};

export default function Question({
  searchParams,
}: {
  searchParams?: { complexity: string };
}) {
  const router = useRouter();
  const [question, setQuestion] = useState<Data>();
  const [selected, setSelected] = useState<string>();

  const query = qs.stringify(
    {
      filters: {
        complexity: {
          $eq: searchParams?.complexity,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  useEffect(() => {
    getQuestion(query).then((res) => {
      if (res) {
        setQuestion(res);
      }
    });
  }, [query]);

  const onCheck = async () => {
    const macData = getCookie("mac");
    const hour = getCookie("hour");
    if (selected && question && macData) {
      const data = await checkAnswer(question.id, selected);
      if (data) {
        const form = new FormData();
        form.append("mac", macData);
        form.append("hour", hour?.toString() ?? "1");
        await fetch("/api/server", {
          method: "POST",
          body: form,
        });

        router.push("/congratulations");
      } else {
        router.push("/fail");
      }
    }
  };

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value);
  };
  const [state, setState] = useState({
    
  })
  useEffect(() => {
    setTimeout(() => {
        setState({
          
        })
    }, 3000)
  }, [])

  return (
    <div className="px-4 max-w-3xl py-10 m-auto text-center flex flex-col align-middle justify-center">
      {question && (
        <>
        <div className="text-2xl">
          <Latex>{question.attributes.task}</Latex>
        </div>
          <Answers answers={question.attributes.answers} onChange={onChange} />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 mt-4 rounded-full"
            onClick={onCheck}
          >
            Ответить
          </button>
        </>
      )}
    </div>
  );
}
