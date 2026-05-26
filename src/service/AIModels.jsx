import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env['VITE_GEMINI_AI_API_KEY'],
});

// Global reference placeholder for our ongoing chat session
let activeChatSession = null;

export const initialPrompt = "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

export async function generateAITrip(processedPrompt, isFollowUp = false) {
  
  // 1. Defining the schema structure matching your prompt exactly
  const travelSchema = {
    type: "OBJECT",
    properties: {
      hotels: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            hotelName: { type: "STRING" },
            hotelAddress: { type: "STRING" },
            price: { type: "STRING" },
            hotelImageUrl: { type: "STRING" },
            geoCoordinates: { type: "STRING" },
            rating: { type: "STRING" },
            description: { type: "STRING" }
          },
          required: ["hotelName", "hotelAddress", "price", "rating"]
        }
      },
      itinerary: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            day: { type: "INTEGER" },
            dayPlan: { type: "STRING" },
            places: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  placeName: { type: "STRING" },
                  placeDetails: { type: "STRING" },
                  placeImageUrl: { type: "STRING" },
                  geoCoordinates: { type: "STRING" },
                  ticketPricing: { type: "STRING" },
                  timeTravel: { type: "STRING" },
                  bestTimeToVisit: { type: "STRING" }
                }
              }
            }
          }
        }
      }
    },
    required: ["hotels", "itinerary"]
  };

  const config = {
    thinkingConfig: { 
      thinkingLevel: ThinkingLevel.MEDIUM 
    },
    tools: [{ googleSearch: {} }], 
    responseMimeType: "application/json",
    responseSchema: travelSchema, 
  };

  try {
    // 2. Initialize the chat session if it doesn't exist yet OR if starting a brand new trip search
    if (!activeChatSession || !isFollowUp) {
      console.log("Initializing a brand new Chat Session...");
      activeChatSession = ai.chats.create({
        model: 'gemini-3.5-flash',
        config,
      });
    } else {
      console.log("Continuing existing chat session using history log...");
    }
    
    // 3. Use sendMessage instead of generateContent to leverage history
    const response = await activeChatSession.sendMessage({
      message: processedPrompt,
    });

    // 4. Return parsed pure data object back to index.jsx
    return JSON.parse(response.text);

  } catch (error) {
    console.error("Error inside chatSession tracking loop:", error);
    throw error;
  }
}