var Discord = require("discord.js");
var bot = new Discord.Client();
const config = require("./config.json")
let prefix = config.prefix

let posGreet = ["hi", "hello", "hey", "yo", "greetings", "hallo", "Grüße"]
let posBye = ["bye", "goodbye", "later", "peace", "cya", "see you later", "tschüss", "auf wiedersehen", "bis später"]
let posThanks = ["thanks", "thank you", "vielen dank", "danke", "gracias"]
let posInsults = ["bitch", "fucker", "fuck", "hoe", "slut", "shit", "penis", "dick", "rude", "ass", "bastard", "nerd", "noob", "cunt", "dipshit", "dork", "dumb", "pussy", "dikklul", "douche", "no life", "capitalist pig", "pig fucker", "trump supporter", ""]

let GREETINGS = ["hi.", "Yo yo yo, what up?", "~~I'm glad you are here, now take off your pants.~~ <@172571295077105664> said I have to stop saying this.", "Hellos are as weird as goodbyes. But Hello I guess.", "WELCOME TO THE MARKOS KINGDOM ~~BITCH~~ kind person.", "OMG gaaaw I am so happy to see you", "Did you shower today? I think so, but I'm just making sure before I hug you. *hugs* ", "Hi! Has anyone told you how good you look today?", "**Hello** *waves excitedly*", "I'm not real, so... you just said hello to a program.", "Please don't talk to me. I'm not over what you did last night", "What's up doc?", "Hiiiiiiiiiiiiiiiii there", "Hey there, buddy!" ];
let THANKS = ["You pay me.", "We aren't friends, I'm just here till my times up.", "I think about killing you every day.", "God damn man! Be cool.", "bitte", "I didn't do that for you", "One day, this will all come back to haunt you.", "uhhhh...", "No, thank YOU for those dick pics last night ;)", "It's what I do best", "You welcome Zucker", "You are soooo welcome", "You are welcome.", "yup.", "k", "kthxbai" ];
let BYE = ["THANK THE LORD! THEY ARE GONE", "I hate to see you go, but I love to watch that ass leave. Wait, is this rude <@172571295077105664>?", "Auf Wiedersehen bitch", "Bye baby ;)", "bye", "k", "Goooooood byyyye *singsong voice*", "Good, now we can talk shit.", "I will miss you", "Ich werde dich jeden Augenblick vermissen", "*blows kisses*", "Bye bish.", "Wait, why?? I thought things were going well! OMMMMGGGG please don't leave!", "You're leaving me, just like my dad did. No, I don't want to talk about it. It's a long story.", "Uh no. This conversation done when I say its done. Hint: It's not done.", "Oh. Bye I guess."];
let MENTION = ["Please go order me a pizza.", "Did you say my name?", "Have you ever felt the love of a women?", "Please stop talking about me.", "Markos is my name, don't wear it out!", "Dear lord, you need a life. I can't always be here to talk to you.", "I'm not real *cries*", "Brah, Sprichst du überhaupt Deutsch?", "Can't talk right now.", "I can't help you, my owner told me to stop being mean.", "Hold on... going through tunnel... losing you..", "??????", "Hallo?", "Willst du mich heiraten?", "If you don't stop saying my name, we'll have a problem." ];
let INSULTS = ["Fuck diese Scheiße.", "Excuse me. This is a safe, clean environment. Do not use that language. ", "why don’t you just kiss my ass?", "Do not take that tone with me.", "Strong words from such a ridiculously named person", "Be mature, asshole", "Language like that turns me on so hard", "Fuck off, you're mean.", "I don't talk to rude people anymore.", "k", "I don't care what you think of me.", "Sticks and stones may break my bones, but your words suck dick.", "Hey, that's what your mom said!", "This is where I usually would mention your grandma doing rather nasty things.", "Do you kiss your mother with that mouth?", "Küss meinen Arsch", "Leck mich", "I'm too cute for you to be rude to me.", "Please don't be mean to me.", "Shizcoff", "Du bist ein großes Arschloch"]

let ayy = ["http://i.imgur.com/G1h11mQ.png", "https://giphy.com/gifs/6OEeB9rxvDyzC", "https://s-media-cache-ak0.pinimg.com/originals/06/c0/9b/06c09be319e549e0fccaa88424ea271a.jpg", "http://i3.kym-cdn.com/photos/images/facebook/000/632/652/6ca.jpg", "http://t6.rbxcdn.com/f9407db64c8f16abc58ce0ff44741534", "https://i.ytimg.com/vi/kiEqGhgWf5Y/maxresdefault.jpg"]
let coin = ["Heads", "Tails"]
let ball = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "It is certain", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "It is certain", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"]

function isArrayInString(str, list) {
    for (let i = 0; i < list.length; i++) {
        if (str.includes(list[i])) return true;
    }
    
    return false;
}

bot.on("message", message => {
	console.log(message.content)

//anti-bot line
	if(message.author.bot) return;


  else if (message.content.toLowerCase().includes("markos")) {
    if (isArrayInString(message.content.toLowerCase(), posGreet)) {
      message.reply(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
    } else if (isArrayInString(message.content.toLowerCase(), posThanks)) {
      message.reply(THANKS[Math.floor(Math.random() * THANKS.length)]);
    } else if (isArrayInString(message.content.toLowerCase(), posBye)) {
      message.reply(BYE[Math.floor(Math.random() * BYE.length)]);
    } else if (isArrayInString(message.content.toLowerCase(), posInsults)) {
      message.reply(INSULTS[Math.floor(Math.random() * INSULTS.length)]);
    } else { 
      message.reply(MENTION[Math.floor(Math.random() * MENTION.length)]);
    }
  }

	else if (message.content.toLowerCase().startsWith(".lul")) {
    message.channel.sendMessage('http://files.gamebanana.com/img/ico/sprays/57822c19e1ad1.png');
  }


    
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);

	let args = message.content.split(" ").slice(1);

	if (command === "cookie") {
		message.channel.sendMessage("No cookies from me.");
	}

  if (command === "info") {
    message.channel.sendMessage("```\n Markos \n \nThe sassy Germanic American Discord bot \n \nCurrent Version: Beta```");
  }

  if (command === "coin") {
    message.channel.sendMessage(coin[Math.floor(Math.random() * coin.length)]);
  }

  if (command === "ayylmao") {
    message.channel.sendMessage(ayy[Math.floor(Math.random() * ayy.length)]);
  }

  if (command === "8ball") {
    message.channel.sendMessage(ball[Math.floor(Math.random() * ball.length)]);
  }

  if (command === "lul") {
    message.channel.sendMessage('http://files.gamebanana.com/img/ico/sprays/57822c19e1ad1.png');
  }

	if (command === "table") {
		message.channel.sendMessage('(╯°□°）╯︵ ┻━┻')
	}
	
  if (command === "ping") {
    message.channel.sendMessage("pong");
  }

  if (command === "hug") {    
    if (message.author.id === '172571295077105664') { //Melmsie
        message.reply("Fick dich! Sie werden nie eine Umarmung haben!");
    } else if (message.author.id === '142076624072867840') { //Iwan
        message.reply("NO");
    } else if (message.author.id === '145456746721312768')  { //Samoxive
        message.reply("You get no hug, you said I'm mean.");
    } else if (message.author.id === '125300331419533312')  { //firearrow
        message.reply("You get 2 hug");
    } else if (message.author.id === '187938633989226497')  { //tc
        message.reply("Your picture scares me. No hug.");
    } else if (message.author.id === '114094000100737024')  { //Heasummn
        message.reply("You say 'Screw you markos', no hug for you ever Hündin. Well, maybe one. Just be nice to me.");
    } else if (message.author.id === '219101103894167552')  { //tuxy
        message.reply("You taught me how to hug. You get fünf");
    } else if (message.author.id === '190173742926790656')  { //Takosara
        message.reply("You get eine hug for now, und you get eine hug after you play overwatch with my bitch, <@172571295077105664>.");
    } else if (message.author.id === '155417194530996225')  { //tbodt
        message.reply("You make me say lul a lot. I guess you get a hug. **PSYCH**");
    } else if (message.author.id === '108770327776997376')  { //Irontoast
        message.reply("As a fellow bot, you know we can't ACTUALLY hug.");
    } else if (message.author.id === '98992981045964800')  { //matrix
        message.reply("I'll hug you when your bot learns how to be nice.");
    } else if (message.author.id === '98992981045964800')  { //satisfied
        message.reply("A weird arm hug for you");
    } else {
        message.reply("No hug for you.");
    }
  }


  if (command === "help") {
    message.reply("\n \nCommands: \n \n`/say [message]` - Speak on behalf of Markos. [Owner Only] \n \n`!cookie` - Markos doesn't give cookies. \n" + 
      "\n`!table` - Only use when you're angry. \n \n`!ping` - Pong! \n \n`!lul` - LUL \n \n`!hug` - Do you get a hug from Markos? \n \n`!ayylmao` - ayyyyyy \n " + 
      "\n`!transate` - Coming Soon! \n \n`!update` - Coming Soon! \n \n`!8ball [message]` - Markos consults his magic 8-ball for you \n \n`!coin` - Flip a coin \n" +
      "\n`!story` - Coming Soon!");
    message.delete()     	
  }

  if (message.content.startsWith("/say")) {
    if (message.author.id !== '172571295077105664') return;
    message.channel.sendMessage(args.join(" "));
    message.delete()
  }

});

bot.on('ready', () => {
  console.log("Let's get it!");
});

bot.login(config.token);