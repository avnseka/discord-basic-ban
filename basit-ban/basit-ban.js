const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
let guild = message.guild.id;   
var prefix = ayarlar.prefix;

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalýsýn!`);
  
	let user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author;
  let reason = args.slice(1).join(' ');
  
  if (!user) return message.channel.send(`Sunucudan yasaklamak istediðiniz kullanýcýyý etiketlemelisiniz; \`${prefix}ban @avn\` `);
  if (user.id === message.author.id) return message.channel.send('Birini etiketlemen lazým.');
  if (user.position > message.member.roles.highest.position) return message.channel.send(`Bu kullanýcýnýn senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
    if (!reason) reason = 'Belirtilmemiþ.'
    if (!user) return message.channel.send(`Etiketlediðin kiþi sunucuda bulunmuyor.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`Etiketlediðin kiþi sunucuda bulunmuyor.`)

 if (!message.guild.member(user).bannable) return message.channel.send(`Bu kiþiyi sunucudan yasaklayamýyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

   if (!message.guild.member(user).bannable) return message.channel.send('Sunucudaki yetkilileri yasaklayamam!');

  message.guild.members.ban(user.id)
  message.channel.send(`<@${user.id}> **Adlý kullanýcý gümledi!** **Sebep: \`${reason}\`**`)

};

exports.conf = {
  aliases: ['yasakla'],
  permLevel: 0,
  kategori: 'Moderasyon'
};

exports.help = {
  name: 'ban',
  description: 'Belirttiðiniz kiþiyi sunucudan yasaklar.',
  usage: 'ban <@kullanýcý> <sebep>',

};
