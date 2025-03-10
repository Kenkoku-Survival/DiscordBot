const config = require('../config.js');

module.exports = async (client, reaction, user, isAdding) => {
    try {
        if (reaction.message.id !== config.AGREE_MINECRAFT_SERVER_RULE_MESSAGE || user.bot || reaction.emoji.name !== "✅") return;

        const guild = await client.guilds.fetch(config.GUILD_ID);
        const member = await guild.members.fetch(user.id);
        const role = await guild.roles.fetch(config.AGREE_MINECRAFT_SERVER_RULE_ROLE);

        if (!role || !member) return;

        if (isAdding) {
            await member.roles.add(role);
            console.log(`✅ Added 'agree minecraft server rules role' to ${user.tag}`);
        } else {
            await member.roles.remove(role);
            console.log(`🚫 Removed 'agree minecraft server rules role' from ${user.tag}`);
        }
    } catch (error) {
        console.error("❌ Error handling reaction for 'agree minecraft server rules':", error);
    }
};