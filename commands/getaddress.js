module.exports = {
	name: 'getaddress',
	description: 'Gets the address of @user',
	parameter: '@user',
	execute(message, args, algosdk) {
		//If no arguments were passed
		if (args.length == 0)
		{
			message.reply("You have not passed any arguments to the command (required: 1, passed: 0)");
		}

    else
    {
        rawuser = args[0]

        //This may seem magical, but in discord, a ping is formatted like <@!{uid}>
        //So substring from after the ! symbol to the end of the string -
        // - to get the users id
        userid = rawuser.substring(rawuser.indexOf('!') + 1, rawuser.indexOf('>'));

        const fs = require('fs');

        //Load json file and parse
        let rawdata = fs.readFileSync('bot/users.json');
        let users = JSON.parse(rawdata);

        //If the users address exists in the database
        if (users['addresses'][userid] != undefined)
        {
          message.reply('That users address is: ' + users['addresses'][userid])
        }

        //User doesn't exist in database
        else
        {
          message.reply("That user doesn't exist or has not registered an address yet")
        }
    }
	},
};
