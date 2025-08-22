import OpenAI from "openai";

const client = new OpenAI({ apiKey: "key", dangerouslyAllowBrowser: true});

/**
 * Rewrites the text for better readibility
 * @param text the text to rewrite 
 * @returns improved text or sent text on failure
 */
export const getAiText = async (text: string): Promise<string>  => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that improves text for a to do list." },
        { role: "user", content: text }
      ],
    });

    return response.choices[0].message?.content || text;
  } catch (error) {
    console.error("Error improving text:", error);
    return text;
  }
}