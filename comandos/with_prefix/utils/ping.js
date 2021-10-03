module.exports = {
    name: "ping",
    alias: [],
    owner_execute: false,
    guild_command: false,
    user_perms: [], 
    bot_perms: [],

    async execute(message, args, client, MessageEmbed){
        message.reply("la API ms es de "+client.ws.ping+"ms.")
    }
}