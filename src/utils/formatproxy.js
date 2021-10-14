module.exports = proxy => {
    const [protocol, tail] = proxy.split('://', 2);

    return `${protocol.startsWith('socks') ? 'socks' : 'http'}://${tail}`;
}
