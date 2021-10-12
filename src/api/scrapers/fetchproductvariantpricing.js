const request = require('request-promise');
const { checkRes } = require('../../utils');

module.exports = async (variant, options) => {
    const { amount, currency, proxy, cookieJar, userAgent } = options;
    let variantID;

    if (typeof variant == 'string') {
        variantID = variant;
    }
    else variantID = variant.uuid;

    const res = await request({
        uri: `https://stockx.com/api/pricing?currency=${currency}&include_taxes=false`,
        method: 'POST',
        headers: {
            'Host': 'stockx.com',
            'sec-fetch-mode': 'cors',
            'origin': 'https://stockx.com',
            'content-type': 'application/json',
            'appos': 'web',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': userAgent,
            'appversion': '0.1',
            'accept': '*/*',
            'sec-fetch-site': 'same-origin',
            'accept-language': 'en-US,en;q=0.9',
        },
        json: {
            context: "buying",
            products: [
                {
                    sku: variantID,
                    amount: amount,
                    quantity: 1,
                },
            ],
        },
        jar: cookieJar,
        simple: false,
        resolveWithFullResponse: true,
        proxy
    });

    checkRes(res);

    return res.body;
};
