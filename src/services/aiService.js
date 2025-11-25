import { GoogleGenerativeAI } from '@google/generative-ai';
import { getCachedData, setCachedData, generateCacheKey } from './cacheService';
import { getMockAnalysis, getMockSymptoms, getMockFact } from './mockService';

// Configuration
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper to get model
const getModel = (modelName = "gemini-2.0-flash") => {
    return genAI.getGenerativeModel({ model: modelName });
};

export const analyzeImage = async (base64Image) => {
    const cacheKey = generateCacheKey(base64Image + 'gemini');
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        const model = getModel("gemini-2.0-flash");

        // Parse base64 string to remove data URL prefix if present
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

        const prompt = "Analyze this image. If it contains a medicinal drug or herb, identify it and list: 1. Name, 2. Medicinal Values, 3. Diseases it cures. If it's not a medicinal item, say so.";

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        setCachedData(cacheKey, text);
        return text;
    } catch (error) {
        console.error("Error analyzing image:", error);
        return getMockAnalysis();
    }
};

export const checkSymptoms = async (diseaseName) => {
    const cacheKey = generateCacheKey(diseaseName.toLowerCase() + 'gemini');
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        const model = getModel();
        const prompt = `You are a helpful medical assistant. When given a disease name, provide: 1. Common Symptoms, 2. Suggested Medicinal Drugs/Treatments. Keep it concise and include a disclaimer to consult a doctor.
        
        Tell me about the disease: ${diseaseName}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        setCachedData(cacheKey, text);
        return text;
    } catch (error) {
        console.error("Error checking symptoms:", error);
        return getMockSymptoms(diseaseName);
    }
};

export const getMedicalFact = async () => {
    try {
        const model = getModel();
        const prompt = "Tell me one interesting, obscure medical fact that most people don't know. Keep it short (under 30 words).";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error fetching fact:", error);
        return getMockFact();
    }
}
