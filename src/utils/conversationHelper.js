const config = require('../config/config');

class ConversationHelper {
    isEndingConversation(message) {
        return config.conversation.exitKeywords.some(
            keyword => message.toLowerCase().includes(keyword)
        );
    }

    validateContactInfo(contactInfo) {
        const requiredFields = config.contactFields;
        return requiredFields.every(field => contactInfo[field]);
    }
}

module.exports = ConversationHelper;