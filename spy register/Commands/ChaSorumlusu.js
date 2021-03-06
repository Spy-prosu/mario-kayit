const Discord = require("discord.js");
const ayar = require('../settings.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.ChatSorumlusu.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye ve isim belirtmelisin.`)).sil(7)
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${message.member}, Kendine Chat Sorumlusu veremezsin!`)).sil(7)
    if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, belirttiğin üye bir bot olamaz!`)).sil(7)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Belirttiğin üye senden üst/aynı pozisyonda!`)).sil(7)

    if (member.roles.cache.has(ayar.roles.ChatSorumlusuRole)) {
        await member.roles.remove(ayar.roles.ChatSorumlusuRole).catch(err => {});
        message.channel.send(embed.setDescription(`${member}, üyesinden ${message.guild.roles.cache.get(ayar.roles.ChatSorumlusuRole)} rolü alındı.`)).sil(7)

    } else {

        await member.roles.add(ayar.roles.ChatSorumlusuRole).catch(err => {});
        message.channel.send(embed.setDescription(`${member}, üyesine ${message.guild.roles.cache.get(ayar.roles.ChatSorumlusuRole)} rolü verildi.`)).sil(7)
    }
    message.react(ayar.emojis.yes).catch(e => {})
};
exports.config = {
    name: "ChatSorumlusu",
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};