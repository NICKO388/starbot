const prettyMilliseconds = require('pretty-ms');

module.exports = class UserInfoCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'channelinfo',
				categoria: '📖 • Info',
				desc: 'Veja todos os comandos que você pode usar.'
			},
			en: {
				nome: 'channelinfo',
				categoria: '📖 • Info',
				desc: 'See all bot commands that are available.'
			},
			aliases: ['ci'],
			run: this.run
		};
	}
	async run(client, message, args, prefixo, idioma) {
		const embed = new (require('discord.js')).MessageEmbed();
		const msg = message;
		let canal;
		try {
			canal = message.mentions.channels.first() || (((args[0]&&!isNaN(args[0]))? message.guild.channels.cache.get(String(args[0])) : message.channel))
			let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';

			switch (idioma) {
				case 'pt':
					embed.setTitle(`${canal.guild.name}`);
					embed.addField(`⌨️ Nome do Canal:`, `**\`${canal.name}\`**`);
					embed.addField(`🔢 ID do Canal:`, `**\`${canal.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Canal criado há:`,
						`${prettyMilliseconds(Date.now() - canal.createdTimestamp, {
							verbose: true
						})
							.replace('day', 'dia')
							.replace('minute', 'minuto')
							.replace('second', 'segundo')
							.replace('week', 'semana')
							.replace('year', 'ano')
							.replace('hour', 'hora')}`
					);
					embed.addField(
						`📖 Tópico:`,
						`${canal.topic||'Desconhecido.'}`
					);
					embed.setThumbnail(
						message.guild.iconURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})||null
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Executado por: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
				
			}
		} catch (e) {
		  console.log(e)
			return message.quote(
				`:x: ${message.author} **|** ${idioma.avatar.unknown}`
			);
		}
	}
};

//Davi
