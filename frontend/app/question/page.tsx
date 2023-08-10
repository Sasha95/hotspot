"use client";
const qs = require("qs");
import React, { useEffect, useState } from "react";

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { checkAnswer, getQuestion } from "../api/question/action";
import { useRouter } from "next/navigation";

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
    (async () => {
      const res = await getQuestion(query);
      if (res) {
        setQuestion(res);
      }
    })();
  }, [query]);

  const onCheck = async () => {
    if (selected && question) {
      const data = await checkAnswer(question.id, selected);
      if (data) {
        router.push("/congratulations");
      } else {
        router.push("/fail");
      }
    }
  };

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value);
  };

  return (
    <div className="px-10 max-w-3xl m-auto text-center h-screen flex flex-col align-middle justify-center">
      {question && (
        <>
          <span className="text-2xl">
            <Latex>{question.attributes.task}</Latex>
          </span>
          {Object.entries(question.attributes.answers).map(
            ([_, value], index) => (
              <div className="mb-[0.125rem] block min-h-[1.5rem]" key={index}>
                <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-2  hover:bg-indigo-300 cursor-pointer ">
                  <input
                    type="radio"
                    name="Text"
                    value={value}
                    onChange={onChange}
                  />
                  <i className="pl-2 text-xl">{value}</i>
                </label>
              </div>
            )
          )}
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
