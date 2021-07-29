module.exports = {
  getOptedIn: async function(assetId, indexerClient) {
    optedInRaw = await indexerClient.lookupAssetBalances(assetId).do();
    optedIn = []

    for (var i = 0; i < optedInRaw['balances'].length; i++)
    {
      optedIn.push(optedInRaw['balances'][i]['address'])
    }

    return optedIn;
  },

  getAssetBalances: async function (assetId, indexerClient)
  {
    assetBalances = await indexerClient.lookupAssetBalances(assetId, -1, 1000000000000000, true ).do();

    return assetBalances;
  },

  getAddressASABalance: function (address, balances)
  {
    for (var i = 0; i < balances['balances'].length; i++)
    {
      if (balances['balances'][i]['address'] == address)
      {
        return balances['balances'][i]['amount'];
      }
    }

    return 0;
  }
}
