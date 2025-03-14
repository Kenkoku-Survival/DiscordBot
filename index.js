const { Client, Events, GatewayIntentBits } = require('discord.js');

const config = require("./config.js");
const agreeDiscordServerRule = require('./events/agreeDiscordServerRules.js');
const agreeMinecraftServerRule = require('./events/agreeMinecraftServerRule.js');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
    ],
  });

  client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
  
    try {
      // サーバー情報を取得する前にボットが準備できていることを確認
      const guild = await client.guilds.fetch(config.GUILD_ID);
      const discord_rule_message = await guild.channels.cache.get(config.AGREE_DISCORD_SERVER_RULE_CHANNEL).messages.fetch(config.AGREE_DISCORD_SERVER_RULE_MESSAGE);
      const minecraft_rule_message = await guild.channels.cache.get(config.AGREE_MINECRAFT_SERVER_RULE_CHANNEL).messages.fetch(config.AGREE_MINECRAFT_SERVER_RULE_MESSAGE);
  
      // メッセージにリアクションを追加
      if (config.DiscordServerRuleAgreeSystem === true) {
        await discord_rule_message.react('✅');
        console.log('Reaction added to the server rules message.');
      } else {
        console.log('DiscordServerRuleAgreeSystem is false.');
      }

      if (config.MinecraftServerRuleAgreeSystem === true) {
        await minecraft_rule_message.react('✅');
        console.log('Reaction added to minecraft rules message.');
      } else {
        console.log('MinecraftServerRuleAgreeSystem is false.');
      }

  
    } catch (error) {
      console.error('Error while adding reaction:', error);
    }
  });

client.on(Events.MessageReactionAdd, (reaction, user) => agreeDiscordServerRule(client, reaction, user, true));
client.on(Events.MessageReactionRemove, (reaction, user) => agreeDiscordServerRule(client, reaction, user, false));
client.on(Events.MessageReactionAdd, (reaction, user) => agreeMinecraftServerRule(client, reaction, user, true));
client.on(Events.MessageReactionRemove, (reaction, user) => agreeMinecraftServerRule(client, reaction, user, false));

client.login(config.TOKEN);