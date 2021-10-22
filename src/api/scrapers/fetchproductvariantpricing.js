const {checkRes, request} = require('../../utils');

module.exports = async (variant, options) => {
    const {amount, currency, proxy, cookieJar, userAgent} = options;
    let variantID;

    if (typeof variant == 'string') {
        variantID = variant;
    } else {
        variantID = variant.uuid;
    }

    const url = `https://stockx.com/api/pricing?currency=${currency}&include_taxes=false`;
    const res = await request(
        url,
        'POST',
        {
            'user-agent': userAgent,
            'sec-fetch-mode': 'cors',
            'origin': 'https://stockx.com',
            'content-type': 'application/json',
            'appos': 'web',
            'x-requested-with': 'XMLHttpRequest',
            'appversion': '0.1',
            'accept': '*/*',
            'sec-fetch-site': 'same-origin',
            'accept-language': 'en-US,en;q=0.9',
            // 'cookies': cookieJar,
        },
        {
            context: "buying",
            products: [
                {
                    sku: variantID,
                    amount: amount,
                    quantity: 1,
                },
            ],
        },
        proxy,
        cookieJar,
    );

    checkRes(res);

    return res.data;
};
