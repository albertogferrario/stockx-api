module.exports = res => {
    if (res.status !== 200 && res.status !== 204) {
        throw new Error("Status code: " + res.status);
    }
}
