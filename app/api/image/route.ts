import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt, amount = 1, resolution = "512x512" } = await req.json();

    if (!userId) {
      return new Response("unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new Response("openai apiKey not configured", { status: 500 });
    }

    if (!prompt) {
      return new Response("Prompt are required", { status: 400 });
    }
    if (!amount) {
      return new Response("Amount are required", { status: 400 });
    }
    if (!resolution) {
      return new Response("Resolution are required", { status: 400 });
    }

    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return Response.json(response.data);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
