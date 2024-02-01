//GET
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompt Not Found', { status: 404 });
    // console.log(prompts);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Fail to fetch all prompt', { status: 500 });
  }
};
//PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response('Prompt Not Found', { status: 404 });
    // console.log(prompts);
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response('Success Update Prompt', { status: 200 });
  } catch (error) {
    return new Response('Fail to fetch all prompt', { status: 500 });
  }
};
//DELETE

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findOneAndDelete(params.id);
    return new Response('Prompte Delete Success!', { status: 200 });
  } catch (error) {
    return new Response('Fail to fetch all prompt', { status: 500 });
  }
};
