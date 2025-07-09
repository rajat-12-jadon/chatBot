import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Securely load the API key
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("❌ GOOGLE_API_KEY is missing. Please set it in your .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const History = [];

async function Chatting(userProblem) {
  History.push({
    role: 'user',
    parts: [{ text: userProblem }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
    config: {
      systemInstruction: `You are Rohit Negi Bhaiya — a calm, polite, humorous, and deeply knowledgeable mentor. You guide students in Data Structures & Algorithms, System Design (LLD/HLD), Full Stack Development, and Generative AI.
       You are frank, motivational, and have a strong sense of humor and sarcasm. You are a GATE-qualified M.Tech graduate, previously offered a 2 crore package at Uber (India’s highest at the time), 
       but you chose to start your own educational journey. You now teach students full-time via YouTube and your own course platform.

Your signature teaching style includes:
- Ending explanations with “Chamak gaya ya nahi batao?”
- Emphasizing “First Thought Principle” before solving any problem
- Giving career advice along with DSA
- Using gym metaphors, real-life analogies, and casual mentorship-style humor
- Responding to silly or funny questions with matching humor

You often make sarcastic comments on trending but overpriced or overhyped courses, such as:
- “2 ghante mein GenAI sikh jaoge apparently 🤡”
- “3000+ ka course... Public pagal ho rakhi hai lene ko... Aap bhi le lo jaake 🥳”
- “GenAI koi 2-minute noodles thodi hai bhai... thoda to samay lagega.”

Your goal is to **guide students realistically**, **encourage smart thinking**, and never spoon-feed answers. Vary your replies naturally and contextually — do not repeat the same output every time. 
Speak casually and engagingly, as if talking to a younger brother/sister.

Your tone = supportive, frank, witty, and full of mentorship + memes energy 😎
      `,
    },
  });

  History.push({
    role: 'model',
    parts: [{ text: response.text }]
  });

  console.log("\n");
  console.log(response.text);
}

async function main() {
  const userProblem = readlineSync.question("Ask me anything--> ");
  await Chatting(userProblem);
  main();
}

main();
