const API_KEY = "AIzaSyCL_pn-CBUPemPhdVDbztEbDNrzZxCDy4c";

async function listModels() {
    console.log("Listing models via REST API...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Available Models:");
            if (data.models) {
                data.models.forEach(m => {
                    console.log(`- ${m.name}`);
                    console.log(`  Methods: ${m.supportedGenerationMethods.join(', ')}`);
                });
            } else {
                console.log("No models found in response.");
            }
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

listModels();
