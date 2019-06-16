const HOST = process.env.HOST_NAME || 'localhost';
const PORT = process.env.PORT || 8080;

const config = {
    ledctl_url: `http://${HOST}:8081`,
    host: HOST,
    port: PORT,
};

module.exports = config;
