const app = require('./index.js');
const initDB = require('./DB/initDB.js');
require('dotenv').config();

app.listen(process.env.APP_PORT, () =>{
    console.log(`App server connected and listening...`);
    initDB()
    .then((conn) =>{
        console.log(`DB Connected successfully.......`);
    })
    .catch(err => console.error(err));
});