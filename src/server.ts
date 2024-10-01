// src/server.ts
import {AppDataSource} from "./data-source";
import app from "./app";

const port = 3000;
AppDataSource.initialize().then(async (connection) => {
    console.log('Connected to Database');
    // Start the server and listen on the specified port
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => console.log('Error during connection: ', error));

