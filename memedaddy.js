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
      } catch (err) {
        console.error(err)
      }
    })
  }
})

client.on('guildCreate', guild => {
  client.user.setGame('in ' + client.guilds.size + ' guilds')
  client.guilds.get(guild.id).fetchMembers()
    .then(x => {
      let c = (x.members.filter(guildMember => guildMember.user.bot).array().length);
      const embed = new Discord.RichEmbed()
        .setAuthor('MemeDaddy has joined ' + guild.name)
        .setColor('#2D7FFF')
        .setThumbnail(guild.iconURL)
        .setDescription(`(${guild.id})`)
        .addField('Guild Owner', guild.owner.user.username + '#' + guild.owner.user.discriminator + `\n(${guild.owner.user.id})`)
        .addField('Bots/Members', `${c}/${guild.memberCount}`)
        .addField('Guild Region', guild.region)
        .addField('Creation Date', guild.createdAt.toString(), true)
        .addField('Emojis', guild.emojis.size > 0 ? guild.emojis.map(d => d.toString()).join(' ') : 'None')
        .addField('Roles', guild.roles.size > 0 ? guild.roles.map(d => d.name).join(', ') : 'None')

      client.guilds.get('281482896265707520').channels.get('287398833468604416').sendEmbed(embed, {
        disableEveryone: true
      });
    })
  let botFarm = client.guilds.filter(g => g.members.filter(m => m.user.bot).size / g.members.size * 100 >= 90 /*%*/ )

  client.user.setGame('in ' + client.guilds.size + ' guilds')
})

client.on('guildDelete', guild => {

  client.user.setGame('in ' + client.guilds.size + ' guilds')
  const embed = new Discord.RichEmbed()
    .setAuthor('MemeDaddy has left ' + guild.name)
    .setColor('#ff6161')
  client.guilds.get('281482896265707520').channels.get('287398833468604416').sendEmbed(embed, {
    disableEveryone: true
  })
})


client.on('ready', () => {
  console.log('MemeDaddy ' + config.version + ' loaded successfully. 👌')
  client.user.setGame('in ' + client.guilds.size + ' guilds')
  const embed = new Discord.RichEmbed()
    .setAuthor('MemeDaddy has been rebooted.')
    .setColor('#00d322')
  client.guilds.get('281482896265707520').channels.get('287398833468604416').sendEmbed(embed, {
    disableEveryone: true
  });
})

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack)
})
