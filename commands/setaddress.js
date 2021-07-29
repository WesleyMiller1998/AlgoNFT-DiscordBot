module.exports = {
	name: 'setaddress',
	description: 'Sets the address for a user',
	parameter: '',
	execute(message, args, algosdk) {
		//If no arguments were passed
		if (args.length == 0)
		{
			message.reply("You have not passed any arguments to the command (required: 1, passed: 0)");
		}

		//The address passed is invalid
		else if (!algosdk.isValidAddress(args[0]))
		{
			message.reply("That is an invalid algorand address");
		}

		//Everything is okay
		else
		{
			const fs = require('fs');

			//Load json file and parse
			let rawdata = fs.readFileSync('bot/users.json');
			let users = JSON.parse(rawdata);

			//Set the field
			users['addresses'][message.author.id] = args[0];

			console.log(JSON.stringify(users));

			//Write the json back
			fs.writeFileSync('bot/users.json', JSON.stringify(users));
			message.reply("Sucessfully set your address to " + args[0] + "!")
		}
	},
};
