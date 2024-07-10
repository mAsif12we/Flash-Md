const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ozR1pna29VSFFLdXhjQWhuaXlrVDZmVXhJejY3SVBOVjkrcm5sTjNudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkc4Z2dCaVJxVjhGWGNneDRqQk1waXlGTEg3ekZHL2tsYnhRWVc4UFkyYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSzdWNmpSeG53ODExNU5aSVBUbUxHNDcxSmN5aDNxMnlhaXJjOW9Ga0c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1aXZlZ3M5TmlLQkRSR0s1Q2tocHIza0hUQk54TmRJSE9MaTVoN1h4WHg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFIRS9LdkU5dlhqbWtDNWh6MzdTbkRrOGRPeWhXWExkZVJxSGl1eTYwRlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRUbEQza2NoNmFpclAwdHA3YXNDYzU0cWFveldXNWhnMGlEd2Q5c2xqMkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU50dWZNVWQrNTVpVWtxcFhhQTBXb012aWhmOE9EWWF2TVNheG1jY0wxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnUrb2MvbmlNWVZGL3g3V0tmUlE3WTNWZExKZUZXZ0tkTDRXYlNXMDRTZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJZeCtRaW1SNDdNbUxMc2FRM2ptOFRrcHUvTDJHY0tzMkFrbUxOMys1amx2c1N6V2tnQkhlQVJYazByZkgwZjJ2YUtjeWwwSG02QmNTZi9YNENQOWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiIvUWo5TTdwSjRRUlJ1bWhFN2tGd2NJNVJtSE1aYXp3Z1BZR1NyRzhyMmtNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzAzNzQ4NDE2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QzcxNzI1Q0VGQTM1REFGMjdGNURCNkFEMzAyMEREMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwNjA0NjM2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJXzltV0kxYlRvU2I5WkE5a1ZuM2tnIiwicGhvbmVJZCI6IjQxNmUyNjljLTlhYjAtNDRhNC1hNTUxLTIyZWQ1YjVlODdjYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFeGVrUk9OZHBmdlBkZHJnYlF2eVQxWTVLOUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSi8wRVlYcnZaMUpRT2JDdVRFRlQ0REZwc0FBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktCQkI0QzZXIiwibWUiOnsiaWQiOiI5MjMwMzc0ODQxNjc6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiR1hTIEJBTktJTkcifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l1RTNaRUdFTXl2dWJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZETktiV0hpM3NCbk9VT3h3bW14UisvQ3h6N05KWExhS004RDl2QjNtRGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJoRzIvT29jYmtSNm80OVpSTWQwQlFUeU1iODNoM0ltNFF3MW9QWSs4THI5SjZhdWs2bW9BSXZiblNGVGlRNGNpemx3YmFlbWdDaUVlMEhUWDEvQUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBZnlkQkRRU24vWlVXK3NoSzQrbVJGbHM5ODFkdURlTE5JT2U2djJ4Wm10U2IzWnM0R1lRY2R1c2hsVmV3dzh4dEFDTFBxdDRyN1dGby9FYVExUFFnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAzNzQ4NDE2NzoxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWUXpTbTFoNHQ3QVp6bERzY0pwc1VmdndzYyt6U1Z5MmlqUEEvYndkNWc0In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNjA0NjMyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBocSJ9',
    PREFIXE: process.env.PREFIX || ".+",
    OWNER_NAME: process.env.OWNER_NAME || "Faisal udas",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "923037484167", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Faisal udas',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/56a42641b6a12a05390de.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '.+',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
