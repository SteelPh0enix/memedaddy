const config = require('./config.json')
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const client = new Discord.Client()

client.login(config.token)


const commandsPath = path.join(__dirname, './commands')

client.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return
  }
  const command = msg.content.substring(config.prefix.length).toLowerCase().split(' ')[0]
  const args = msg.content.split(' ').slice(2)
  if (command === 'eval') {
    const {
      username,
      discriminator,
      id
    } = msg.author
    const owner = client.users.get(config.owner)
    const script = args.join(' ')
    if (msg.author.id === config.owner) {
      try {
        const dank = eval(script) // eslint-disable-line no-eval
        msg.channel.sendCode('js', dank)
      } catch (e) {
        msg.channel.sendMessage(':warning: **ERROR** :warning: ```\n' + e + '\n```')
      }
    } else {
      msg.reply('you don\'t have permission to use this command.')
      owner.sendMessage(`**${username}#${discriminator} (${id}):**\nThis person was trying to use the eval command!\n${script}`)
    }
  } else {
    fs.access(path.join(commandsPath, command + '.js'), fs.constants.R_OK, (err) => {
      if (err) {
        return
      }
      try {
        delete require.cache[require.resolve('./commands/' + command)]
        require('./commands/' + command).run(client, msg, args, config, Discord)
        const embed = new Discord.RichEmbed()
          .setAuthor(command)
          .setColor('#7d5bbe')
          .setDescription(msg.author.username + `#` + msg.author.discriminator + ` in ` + msg.guild)
        try {
          client.guilds.get('281482896265707520').channels.get('297254732647628800').sendEmbed(embed, {
            disableEveryone: true
          });
        } catch (e) {
          console.log(e)
        }
      } catch (err) {
        console.error(err)
      }
    })
  }
})

client.on('guildCreate', guild => {

  client.guilds.get(guild.id).fetchMembers()
    .then(x => {
      let c = (x.members.filter(guildMember => guildMember.user.bot).array().length);
      let d = guild.memberCount - c
      let percentage = Math.round((c / guild.memberCount) * 100)
      if (percentage > 75) {
        client.guilds.get('281482896265707520').channels.get('297554251452776458').sendMessage(`🤖 Guild: \`${guild.name}\`\nTotal: **${guild.memberCount}** | Humans: **${d}** | Bots: **${c}** | Percent: **${percentage}** `)
      } else {
        client.guilds.get('281482896265707520').channels.get('297554251452776458').sendMessage(`✅ Guild: \`${guild.name}\`\nTotal: **${guild.memberCount}** | Humans: **${d}** | Bots: **${c}** | Percent: **${percentage}** `)
      }
    })

})

client.on('guildDelete', guild => {

  client.guilds.get('281482896265707520').channels.get('297554251452776458').sendMessage(`❌ Guild: \`${guild.name}\``)

})


client.on('ready', () => {
  console.log(client.user.username + config.version + ' loaded successfully. 👌')
  client.user.setGame('pls help', 'https://www.twitch.tv/melmsiebot')
})

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack)
})
