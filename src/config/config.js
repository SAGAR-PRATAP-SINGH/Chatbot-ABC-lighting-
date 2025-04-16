const config = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo"
    },
    conversation: {
        followUpQuestion: "Is there anything else I can help you with?",
        exitKeywords: ["no", "nope", "that's all", "thank you"]
    },
    contactFields: ["name", "email", "phone"]
};

module.exports = config;