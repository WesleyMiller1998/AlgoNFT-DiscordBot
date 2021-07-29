module.exports = {
	name: 'address',
	description: 'Gets the address of the player who executed the command',
  parameter: '',
	execute(message, args, algosdk) {
      const fs = require('fs');
      //Load json file and parse
      let rawdata = fs.readFileSync('bot/users.json');
      let users = JSON.parse(rawdata);

      //If the users address exists in the database
      if (users['addresses'][message.author.id] != undefined)
      {
        message.reply('Your address is: ' + users['addresses'][message.author.id])
      }

      //User doesn't exist in database
      else
      {
        message.reply("That user doesn't exist or has not registered an address yet")
      }
	},
};
