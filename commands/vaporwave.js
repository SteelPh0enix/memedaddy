const { vaporize } = require('../utils')

exports.run = function (client, msg, args) {
  const text = vaporize(args.join(' '))

  msg.reply(`**${text}**`)
}
