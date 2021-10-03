const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("./settings.json");

client.commands = new Collection();
client.cooldown = new Collection();

const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./eventos/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const commandFolders = fs.readdirSync("./comandos/with_prefix");
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./comandos/with_prefixv/${folder}`).filter(file => file.endsWith(".js"))
  for (const file of commandFiles) {
    const command = require(`./comandos/with_prefix/${folder}/${file}`);
    client.commands.set(command.name, command)
  }
}

client.login(config.client.token)