exports.run = async function (client, msg, args, config) {
  if (msg.author.id === config.owner) {
    msg.react('👌')

    await msg.channel.sendMessage('tfw Melmsie hates me 😦\n\nRebooting...')
    process.exit()
  } else {
    msg.channel.sendMessage("tfw you don't have permission to use this command :fire:")
  }
}
