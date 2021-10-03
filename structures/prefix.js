/*const megadb = require("megadb");
const { config } = require("process");
const prefixdb = new megadb.crearDB("guild");
let confg = require("../settings.json")

/** 
* @param prefix usa un prefix ya sea mention o uno por default
* @returns returna un prefix


function prefix(message, client) {
let prefix = prefixdb.has(message.guild.id) ? await prefixdb.get(message.guild.id) : config.client.prefix;
    
if (message.content.match(`^<@!?${client.user.id}>( |)$`)){
    return confg.client.prefix // !id>
}else{
    return prefix
}
}

module.exports.prefix = prefix*/
