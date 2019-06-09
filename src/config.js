const HOST = process.env.HOST_NAME || 'localhost';
const PORT = process.env.PORT || 8080;

const config = {
    url: `http://${HOST}:${PORT}`,
    port: PORT,
};

export default config;