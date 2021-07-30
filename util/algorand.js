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

  getAddressAssets: async function(address, indexerClient) {
    const assetIds = [281003266, 281003863, 281004528, 281005704];
    assets = {};

    accountInfo = await indexerClient.lookupAccountByID(address).do();
    if (accountInfo['account'].hasOwnProperty('assets')) 
    {
        accountInfo['account']['assets'].forEach(element => 
        {
            if (assetIds.includes(element['asset-id'])) 
            {
                assets[element['asset-id']] = element['amount'];
            }
        });
    }

    return assets;
  }
}
