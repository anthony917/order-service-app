const rootPath = require("../rootPath");

const googleMapClient = require("@google/maps").createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});


module.exports = googleMapClient;