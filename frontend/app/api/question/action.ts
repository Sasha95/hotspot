"use server";

import { Question } from "@/app/question/page";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

type Meta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type DataQuestion = {
  data: {
    id: number;
    attributes: Question;
  }[];
  meta: {
    pagination: Meta;
  };
};

export async function getQuestion(query: string) {
  const data = await fetch(`${API_URL}/api/exercises?${query}`, {
    cache: "no-cache",
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const jsonData = (await data.json()) as DataQuestion;

  if (jsonData.data) {
    const item =
      jsonData.data[Math.floor(Math.random() * jsonData.data.length)];

    return item;
  }
}

export async function checkAnswer(id: number, answer: string) {
  const data = await fetch(`${API_URL}/api/exercises/${id}`, {
    cache: "no-cache",
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },

  });

  const jsonData = (await data.json()) as {
    data: {
      id: number;
      attributes: Question;
    };
  };

  return jsonData.data.attributes.correct_answer == JSON.parse(jsonData.data.attributes.answers).findIndex((el: any) => el.toString() == answer);
}
