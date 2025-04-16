const config = require('../config/config');
const dataService = require('./dataService');
const ConversationHelper = require('../utils/conversationHelper');

class ChatService {
    constructor() {
        this.conversationHelper = new ConversationHelper();
    }

    async processMessage(message, conversationHistory) {
        try {
            // Handle conversation ending
            if (this.isEndingConversation(message)) {
                return {
                    response: "Before you go, could you please provide your contact information? Please share your name, email, and phone number.",
                    followUp: null,
                    collectContact: true
                };
            }

            // Handle contact information collection
            if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].collectContact) {
                return {
                    response: "Thank you for providing your contact information. Have a great day!",
                    followUp: null,
                    endConversation: true
                };
            }

            // Handle product information and images
            const response = await this.generateProductResponse(message);
            
            return {
                response: response,
                followUp: "Is there anything else I can help you with?",
                imageUrl: this.getImageUrlIfRequested(message)
            };

        } catch (error) {
            console.error('ChatService Error:', error);
            throw new Error('Failed to process message');
        }
    }

    async generateProductResponse(message) {
        const companyInfo = dataService.getCompanyInfo();
        const products = dataService.products;

        if (message.toLowerCase().includes('image') || message.toLowerCase().includes('picture')) {
            const productType = this.identifyProductType(message);
            if (productType) {
                const product = dataService.getProductInfo(productType);
                return {
                    response: `Here's our ${product.name}:`,
                    imageUrl: product.image_path,
                    followUp: true
                };
            }
        }

        // Product information
        if (message.toLowerCase().includes('product') || message.toLowerCase().includes('light')) {
            const productInfo = this.getProductDetails(message);
            return {
                response: productInfo || "We offer solar-powered street lights, driveway lights, and wall lights. Which one would you like to know more about?",
                followUp: true // Show follow-up for product queries
            };
        }

        // General queries without follow-up
        return {
            response: "Welcome to ABC Lighting! How can I assist you today?",
            followUp: false
        };
    }

    // Remove or comment out this function as it's causing conflicts
    // getImageUrlIfRequested(message) {
    //     if (message.toLowerCase().includes('image') || message.toLowerCase().includes('picture')) {
    //         const productType = this.identifyProductType(message);
    //         if (productType) {
    //             return `/images/${productType}`;
    //         }
    //     }
    //     return null;
    // }

    // Update processMessage to remove the duplicate image URL handling
    async processMessage(message, conversationHistory) {
        try {
            // Handle conversation ending
            if (this.isEndingConversation(message)) {
                return {
                    response: "Before you go, could you please provide your contact information? Please share your name, email, and phone number.",
                    followUp: null,
                    collectContact: true
                };
            }

            // Handle contact information collection
            if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].collectContact) {
                return {
                    response: "Thank you for providing your contact information. Have a great day!",
                    followUp: null,
                    endConversation: true
                };
            }

            // Handle product information and images
            const response = await this.generateProductResponse(message);
            
            return {
                response: response.response,
                followUp: response.followUp,
                imageUrl: response.imageUrl
            };

        } catch (error) {
            console.error('ChatService Error:', error);
            throw new Error('Failed to process message');
        }
    }

    identifyProductType(message) {
        const msg = message.toLowerCase();
        if (msg.includes('street')) return 'street_light';
        if (msg.includes('driveway')) return 'driveway_light';
        if (msg.includes('wall')) return 'wall_light';
        return null;
    }

    getProductDetails(message) {
        const productType = this.identifyProductType(message);
        if (productType) {
            const product = dataService.getProductInfo(productType);
            return `The ${product.name} (${product.id}) features:\n` +
                   `- Dimensions: ${product.specifications.dimensions}\n` +
                   `- Brightness: ${product.specifications.brightness}\n` +
                   `- Runtime: ${product.specifications.runtime}\n` +
                   `- Price: $${product.price}\n` +
                   `- Warranty: ${product.warranty}`;
        }
        return null;
    }

    isEndingConversation(message) {
        const endPhrases = ['no', 'nope', "that's all", 'thank you'];
        return endPhrases.some(phrase => message.toLowerCase().includes(phrase));
    }

    async generateResponse(message, context, history) {
        // Implementation for ChatGPT API call would go here
        // This would include the context and maintain conversation history
    }

    handleConversationEnd(finalResponse) {
        return {
            response: finalResponse,
            collectContact: true,
            fields: config.contactFields
        };
    }
}

module.exports = new ChatService();