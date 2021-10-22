const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const SocksProxyAgent = require('socks-proxy-agent');

/**
 * @param {string} proxy
 * @return {HttpsProxyAgent|SocksProxyAgent}
 */
const makeAgent = proxy => proxy.startsWith('socks') ? new SocksProxyAgent(proxy) : new HttpsProxyAgent(proxy)

/**
 * @param {string} url
 * @param {string} method
 * @param headers
 * @param {Object|null} data
 * @param {string|null} proxy
 * @param cookieJar
 * @param config
 */
module.exports = async (url, method = 'GET', headers = {}, data = null, proxy = null, cookieJar = null, config = {}) => {
    const agent = proxy ? makeAgent(proxy) : undefined;

    // fixme: use cookieJar

    return await axios.request({
        url,
        method,
        headers,
        data,
        httpAgent: agent,
        httpsAgent: agent,
        ...config,
    })
}
