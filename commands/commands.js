   exports.run = function (client, msg, args, config, Discord) {
       const memes = new Discord.RichEmbed()
           .setColor('#ff0000')
           .setAuthor(`Commands`)
           .setDescription('Be sure to use `pls <command>`')
           .addField('<:megusta:293231471173304320> Memey Commands', 'asktrump, joke, kitty, knock, mama, meirl, norris, pun, pupper, rip, say, shitpost, xkcd')
           .addField('<:LUL:298887728161095681> Tags & ᵗᵉˣᵗ ｍａｎｉｐｕｌａｔｉｏｎ', 'feelsbadman, flip, leet, lenny, lul, superscript, vaporwave, zalgo')
           .addField('🔨 Moderation Tools', 'ban, kick, purge')
           .addField('🖼 Image Manipulation', 'trigger, invert, salty')
           .addField('🎤 Voice Commands', 'airhorn')
           .addField('ℹ Utilities and Information', 'bug, commands, help, info, ping, prefix, serverinfo, stats, support, uptime, userinfo')
           .addField('<:memesie:298886809524502529> Melmsie Only', 'bash, eval, kys, report, servers, spyon')
           .addField('Coming <:soon:233642257817927680>', 'memegen, magik, swirl, soundclown')
           .setFooter("Current commands as of ")
           .setTimestamp(new Date(msg.createdTimestamp))

       msg.channel.sendEmbed(memes, {
           disableEveryone: true
       })

   }
