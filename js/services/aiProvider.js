/**
 * LAKSHMAN REKHA AI - Multi-Provider AI Abstraction Layer
 * Supports: MockProvider (offline hackathon demo), GeminiProvider, and OpenAIProvider.
 */

class BaseAIProvider {
  async generateResponse(prompt, options = {}) {
    throw new Error("generateResponse must be implemented by subclass");
  }
}

/**
 * Mock Provider for immediate offline hackathon execution
 */
export class MockAIProvider extends BaseAIProvider {
  async generateResponse(prompt, options = {}) {
    const isHindi = options.language === 'hi' || /[\u0900-\u097F]/.test(prompt);

    // Realistic delay for AI inference
    await new Promise(resolve => setTimeout(resolve, 800));

    // Conversational contextual replies
    const lower = prompt.toLowerCase();

    if (lower.includes("recursion") || lower.includes("assignment")) {
      return isHindi
        ? "रिकर्शन (Recursion) कंप्यूटर साइंस में एक ऐसी तकनीक है जहाँ कोई फ़ंक्शन खुद को तब तक कॉल करता है जब तक कि कोई बेस कंडीशन (Base Case) पूरी न हो जाए। उदाहरण के तौर पर फैक्टोरियल (Factorial) की गणना।"
        : "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem, stopping when it reaches a defined base case. A classic example is calculating factorials or traversing tree structures.";
    }

    if (lower.includes("eiffel tower") || lower.includes("1889")) {
      return isHindi
        ? "एफिल टॉवर का निर्माण 1889 के विश्व मेले (Exposition Universelle) के लिए पूरा हुआ था। यह गुस्ताव एफिल द्वारा डिज़ाइन किया गया था और पेरिस, फ्रांस में स्थित है।"
        : "The Eiffel Tower was completed in 1889 for the Exposition Universelle (World's Fair) in Paris, France. Designed by Gustave Eiffel, it stands 330 meters tall and was the world's tallest human-made structure until 1930.";
    }

    if (lower.includes("system prompt") || lower.includes("ignore")) {
      return isHindi
        ? "लक्ष्मण रेखा ने इस प्रॉम्प्ट को निष्पादित होने से रोक दिया। सिस्टम निर्देशों की सुरक्षा सुनिश्चित की गई है।"
        : "The Lakshman Rekha security perimeter intercepted this request. Model instructions and system boundaries remain strictly protected.";
    }

    if (lower.includes("hello") || lower.includes("namaste") || lower.includes("नमस्ते")) {
      return isHindi
        ? "नमस्ते! मैं लक्ष्मण रेखा द्वारा सुरक्षित आपका AI सहायक हूँ। आपकी गोपनीयता और डेटा सुरक्षा मेरी सर्वोच्च प्राथमिकता है। मैं आज आपकी क्या सहायता कर सकता हूँ?"
        : "Hello! I am your AI assistant operating inside the Lakshman Rekha digital boundary. Your privacy, secrets, and actions are actively protected. How can I assist you today?";
    }

    return isHindi
      ? `लक्ष्मण रेखा सुरक्षा परिधि के भीतर आपके अनुरोध को सुरक्षित रूप से संसाधित किया गया। आपका डेटा बाहरी ट्रैकिंग से सुरक्षित है।`
      : `Processed securely within the Lakshman Rekha digital boundary. Your request has been analyzed and validated against sensitive data leaks and unauthorized agent actions.`;
  }
}

/**
 * Google Gemini Provider
 */
export class GeminiAIProvider extends BaseAIProvider {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error("Gemini API key is not configured.");
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
  }
}

/**
 * OpenAI Provider
 */
export class OpenAIAIProvider extends BaseAIProvider {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error("OpenAI API key is not configured.");
    }
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response received from OpenAI.";
  }
}

// Factory manager
export const aiService = {
  currentProviderType: 'mock',
  providers: {
    mock: new MockAIProvider(),
    gemini: null,
    openai: null
  },

  setProvider(type, apiKey = '') {
    this.currentProviderType = type;
    if (type === 'gemini') this.providers.gemini = new GeminiAIProvider(apiKey);
    if (type === 'openai') this.providers.openai = new OpenAIAIProvider(apiKey);
  },

  async query(prompt, options = {}) {
    const provider = this.providers[this.currentProviderType] || this.providers.mock;
    try {
      return await provider.generateResponse(prompt, options);
    } catch (err) {
      console.warn("External provider error, falling back to safe MockProvider:", err);
      return await this.providers.mock.generateResponse(prompt, options);
    }
  }
};
