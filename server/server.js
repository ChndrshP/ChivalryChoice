import http from 'http';
import app from './app/app.js';

//creating server
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(7000, console.log(`Server in running on port ${PORT}`));

