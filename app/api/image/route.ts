import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

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

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new Response("Free trial has expired.", { status: 403 });
    }

    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    return Response.json(response.data);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
