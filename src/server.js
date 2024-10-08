const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    const server = Hapi.server({
        port: process.env.NODE_ENV !== 'production' ? 5000 : 80, // Port dapat disesuaikan
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'], // Mengizinkan CORS dari semua asal
            },
        },
    });

    server.route(routes); // Menambahkan rute ke server

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// Menjalankan fungsi init untuk memulai server
init().catch((err) => {
    console.error(err);
    process.exit(1);
});