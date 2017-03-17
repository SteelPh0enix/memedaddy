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

  if (command === 'gonna get to this later, ignore this') {
    if (args[0]) {
      try {
        msg.channel.sendMessage(require(`./commands/${args[0]}`).help)
      } catch (err) {
        msg.channel.sendMessage(`\`${args[0]}\` is not a valid command`)
      }
    } else {
      const commands = fs.readdirSync(commandsPath)
        .map(file => file.replace('.js', ''))
        .join('\n')

      msg.channel.sendMessage(`**__Here are my commands, mmkay?__**\n \n\`${commands}\`\n \nTo see specific help or information about a command do \`pls help <command name>\`\n\nIf you find any bugs or errors, please do \`pls bug <bug report>\``)
    }
  } else if (command === 'eval') {
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
  } else if (command === 'say') {
    if (msg.author.id === config.owner) {
      const say = args.join(' ')
      msg.delete();
      msg.channel.sendMessage(say)
    }
  } else {
    fs.access(path.join(commandsPath, command + '.js'), fs.constants.R_OK, (err) => {
      if (err) {
        return
      }

      try {
        delete require.cache[require.resolve('./commands/' + command)]

        require('./commands/' + command).run(client, msg, args, config, Discord)
      } catch (err) {
        console.error(err)
      }
    })
  }
})

client.on('guildCreate', guild => {
  client.guilds.get('281482896265707520').channels.get('287398833468604416').sendMessage(`\`\`\`\nMarkos has joined a new guild.\n\n**__Guild Name:__** ${guild.name}\n\n**__Guild ID:__** ${guild.id}\n\n**__Guild Owner:__** ${guild.owner.user.username}\n\n**__Guild Owner ID:__** ${guild.owner.user.id}\n\n**__Member Count:__** ${guild.memberCount}\n\`\`\``)
})

client.on('guildDelete', guild => {
  client.guilds.get('281482896265707520').channels.get('287398833468604416').sendMessage(`\`\`\`\nMarkos has left a guild.\n\n**__Guild Name:__** ${guild.name}\n\n**__Guild ID:__** ${guild.id}\n\n**__Guild Owner:__** ${guild.owner.user.username}\n\n**__Guild Owner ID:__** ${guild.owner.user.id}\n\n**__Member Count:__** ${guild.memberCount}\n\`\`\``)
})

client.on('ready', () => {
  console.log('Markos ' + config.version + ' loaded successfully. 👌')
  client.user.setGame(config.prefix + 'help | formerly Markos')
  console.log('Welcome, Austin. 👀')
})

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack)
})