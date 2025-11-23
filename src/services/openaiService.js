import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

// Helper function for exponential backoff
const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0 && error.status === 429) {
            console.warn(`Rate limited. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryWithBackoff(fn, retries - 1, delay * 2);
        }
        throw error;
    }
};

export const analyzeImage = async (base64Image) => {
    try {
        const response = await retryWithBackoff(() => openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this image. If it contains a medicinal drug or herb, identify it and list: 1. Name, 2. Medicinal Values, 3. Diseases it cures. If it's not a medicinal item, say so." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": base64Image,
                            },
                        },
                    ],
                },
            ],
        }));
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error analyzing image:", error);
        if (error.status === 401) throw new Error("Invalid API Key. Please check your key.");
        if (error.status === 429) throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        throw new Error(error.message || "Failed to analyze image.");
    }
};

export const checkSymptoms = async (diseaseName) => {
    try {
        const response = await retryWithBackoff(() => openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful medical assistant. When given a disease name, provide: 1. Common Symptoms, 2. Suggested Medicinal Drugs/Treatments. Keep it concise and include a disclaimer to consult a doctor."
                },
                {
                    role: "user",
                    content: `Tell me about the disease: ${diseaseName}`
                },
            ],
        }));
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error checking symptoms:", error);
        if (error.status === 429) throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        throw new Error(error.message || "Failed to get disease information.");
    }
};

export const getMedicalFact = async () => {
    try {
        const response = await retryWithBackoff(() => openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: "Tell me one interesting, obscure medical fact that most people don't know. Keep it short (under 30 words)."
                }
            ]
        }));
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching fact:", error);
        return "Did you know? The human body contains enough carbon to provide 'lead' (which is really graphite) for about 9,000 pencils.";
    }
}
