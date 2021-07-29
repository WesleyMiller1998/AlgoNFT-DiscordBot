module.exports = {
	name: 'balance',
	description: 'Gets the game balance of the user who executed the command',
	parameter: '',
	async execute(message, args, algosdk, algoClient, indexerClient) {
		const coupId = 281003266;
		const eureId = 281003863;
		const sweeId = 281004528;
		const haasId = 281005704;

		const waitTimeInMs = 1100;
		//Sleep function, we get blocked by the api if we put in too many requests too fast
		const sleep = require('system-sleep');

		const fs = require('fs');
		const algorandUtil = require('../util/algorand.js');

		//Load json file and parse
		let rawdata = fs.readFileSync('./bot/users.json');
		let users = JSON.parse(rawdata);

    //The person executing the command has a registered address
    if (users['addresses'][message.author.id] != undefined)
    {
			//For some reason algorand sdk doesn't provide a method to get the ASA balance of a certain address :/
			//Instead, get balances of all the addresses and loop through
      coup = await algorandUtil.getAssetBalances(coupId, indexerClient)
			sleep(waitTimeInMs)
			eure = await algorandUtil.getAssetBalances(eureId, indexerClient)
			sleep(waitTimeInMs)
			swee = await algorandUtil.getAssetBalances(sweeId, indexerClient)
			sleep(waitTimeInMs)
			haas = await algorandUtil.getAssetBalances(haasId, indexerClient)

			address = users['addresses'][message.author.id]

			//Function that loops through to get the actual balance of an address
			//DRY blah blah blah..... there's no point in DRYing this, it works fine already and performance gains are minimal
			coupBal = algorandUtil.getAddressASABalance(address, coup)
			eureBal = algorandUtil.getAddressASABalance(address, eure)
			sweeBal = algorandUtil.getAddressASABalance(address, swee)
			haasBal = algorandUtil.getAddressASABalance(address, haas)

			message.reply(`\nCoupon(:ticket:): ${coupBal}\nEure(:lemon:): ${eureBal}\nWatermelon(:watermelon:): ${sweeBal}\nHaas (:avocado:): ${haasBal}`)
    }

    //They haven't registered an address, tell them to do so
    else
    {
      message.reply("You haven't registed an address yet, to do that, execute the command: g!setAddress <address>");
    }
	},
};
