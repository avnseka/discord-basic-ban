const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
let guild = message.guild.id;   
var prefix = ayarlar.prefix;

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek i�in **�yeleri Yasakla** iznine sahip olmal�s�n!`);
  
	let user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author;
  let reason = args.slice(1).join(' ');
  
  if (!user) return message.channel.send(`Sunucudan yasaklamak istedi�iniz kullan�c�y� etiketlemelisiniz; \`${prefix}ban @avn\` `);
  if (user.id === message.author.id) return message.channel.send('Birini etiketlemen laz�m.');
  if (user.position > message.member.roles.highest.position) return message.channel.send(`Bu kullan�c�n�n senin rollerinden/rol�nden daha y�ksek rolleri/rol� var.`);
    if (!reason) reason = 'Belirtilmemi�.'
    if (!user) return message.channel.send(`Etiketledi�in ki�i sunucuda bulunmuyor.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`Etiketledi�in ki�i sunucuda bulunmuyor.`)

 if (!message.guild.member(user).bannable) return message.channel.send(`Bu ki�iyi sunucudan yasaklayam�yorum ��nk� \`benden daha y�ksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

   if (!message.guild.member(user).bannable) return message.channel.send('Sunucudaki yetkilileri yasaklayamam!');

  message.guild.members.ban(user.id)
  message.channel.send(`<@${user.id}> **Adl� kullan�c� g�mledi!** **Sebep: \`${reason}\`**`)

};

exports.conf = {
  aliases: ['yasakla'],
  permLevel: 0,
  kategori: 'Moderasyon'
};

exports.help = {
  name: 'ban',
  description: 'Belirtti�iniz ki�iyi sunucudan yasaklar.',
  usage: 'ban <@kullan�c�> <sebep>',

};
