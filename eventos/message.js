const { Collection , MessageEmbed} = require("discord.js");
//const prefix_core = require("../structures/prefix.js")

module.exports = {
	name: 'messageCreate',
 async execute(message, client) { 
    
    let prefix = prefixdb.has(message.guild.id) ? await prefixdb.get(message.guild.id) : config.client.prefix;
    if (message.author.bot) return;

    let args = message.content.slice(prefix.lnegth).tirm.split("/ +/")

    let Command_name = args.shift().toLowerCase();
   
    const command = client.commands.get(Command_name) || client.commands.find(cmd => cmd.alias && cmd.alias.includes(Command_name))

    if(!command){
        return 
    }
    //modulos

    let owners = config.client.owners

    if(command.owner_execute && owners.includes(message.author.id)){
        command.execute(message, args, client, MessageEmbed)
    }

    if(command.guild_command && message.channel.type === "DM"){
        return message.reply("Este commando solo se puede ejecutar en un `canal normal`")
    }

    if (command.user_perms) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.user_perms)) {
            return message.reply('Permisos Insuficientes \n\ Necesitas: `' + command.user_perms + '`');
        }
    }

    if (command.bot_perms) {
        try {
            if (!message.guild.me.hasPermission(command.bot_perms)) {
                return message.reply('No tengo permisos Insuficientes nesesito \n\ Necesito: `' + command.bot_perms+ '`');
            }    
        } catch (error) {
            
        }
        
    }

    if (command.args && !args.length) {
        let lineReply = `No has proveido argumentos, ${message.author}!`;
    
        if (command.usage) {
            lineReply += `\nEl uso adecuado seria \`${prefix}${command.name} ${command.usage}\``;
        }
            return message.reply(lineReply);
    }

    const { cooldowns } = client;

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Collection() )
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.lineReply(`Por favor espera ${timeLeft.toFixed(1)} segundos antes de volver a usar \`${command.name}\` `);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, client, MessageEmbed)
    } catch (error) {
        console.log("new error => "+ error)
        message.reply(`\`\`\`prolog\n❌ | Ha Ocurrido Un Error Mientras Se Ejecutaba El Comando\`\`\``)
    }


}
}