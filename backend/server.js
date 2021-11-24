const app = require('./app');

const connectDatabase = require('./config/database.js')
const cloudinary = require('cloudinary');

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})


//config

if(process.env.NODE_ENV !=="PRODUCTION" ){
   require("dotenv").config({ path: 'backend/config/config.env' });
}
//connecting to database
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const server=app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT} `)
})


// unHandeled promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
});