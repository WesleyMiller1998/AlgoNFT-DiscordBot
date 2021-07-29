module.exports = {
	name: 'help',
	description: 'Lists commands and their functions',
  parameter: '',
	async execute(message, args, algosdk, algoClient, indexerClient, commandCollection) {
    reply = "\n"
    commandCollection.array().forEach(element => {
      reply += "g$" + element.name + " " + element.parameter + " - " + element.description + "\n";
    })

    reply += "Note: Commands are case insensitive"
    message.reply(reply)
	},
};
