import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must only answer only in markdown code snippets. use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new Response("unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new Response("openai apiKey not configured", { status: 500 });
    }

    if (!messages) {
      return new Response("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return Response.json(response.choices[0].message);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
