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
		
		console.log(users)

    //The person executing the command has a registered address
    if (users['addresses'][message.author.id] != undefined)
    {
	    console.log("g$balance Address exists")
		address = users['addresses'][message.author.id]

		assets = algorandUtil.getAddressAssets(address)
		console.log("Got lists of ASA balances")
		
		coupBal = assets[coupId] ? assets[coupId] : 0;
		eureBal = assets[eureId] ? assets[eureId] : 0;
		sweeBal = assets[sweeId] ? assets[sweeId] : 0;
		haasBal = assets[haasId] ? assets[haasId] : 0;
		console.log("Got the balances")
	    
		message.reply(`\nCoupon(:ticket:): ${coupBal}\nEure(:lemon:): ${eureBal}\nWatermelon(:watermelon:): ${sweeBal}\nHaas (:avocado:): ${haasBal}`)
    }

    //They haven't registered an address, tell them to do so
    else
    {
      message.reply("You haven't registed an address yet, to do that, execute the command: g!setAddress <address>");
    }
	},
};
