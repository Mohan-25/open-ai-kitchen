import { NextApiRequest, NextApiResponse } from "next";
type Data = {
  message: String;
  aiResponse?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request are allowed" });
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Act like an experienced Chef who knows everything about cuisine in the world. Give me step-by-step instructions to prepare ${req.body.dish}. If that is not a cuisine then tell me that is not a cuisine and don't give any further explanation`,
      temperature: 0.5,
      max_tokens: 550,
    }),
  });
  const aiResponse = await response.json();
  res.json({ message: "Success", aiResponse });
}

// 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
// org-HTXbeLapchlD9gI8DMrjblXg
