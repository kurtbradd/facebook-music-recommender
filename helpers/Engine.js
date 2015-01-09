var prediction = require('predictionio')({
    key: 'O25CzUErhnRXR6tEL5KgF4CfMo73WmrXNFm9ykYfK5Dlpg1d5mtqLMySfe2m2cFI',
    baseUrl: 'http://162.243.227.24:8000/'
  })
	prediction.items.get(14, function (err, res) {
    console.log(err, res)
  })