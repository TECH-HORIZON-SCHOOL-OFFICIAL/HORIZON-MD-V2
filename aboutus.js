const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {

YOUR_DETAILS: process.env.YOUR_DETAILS || "*🔰HELLO TECH HORIZON MD USER🔰*\n\nTECH HORIZON SCHOOL INC. is a dedicated WhatsApp group with a powerful mission: to provide essential tools and solutions to the people who make a difference in the world.💫\n\n Led by *`Dakshan Bhashana`* our team, consisting of\n*• Gavesh*\n*• Sevin*\n*• Mihiranga* collaboratively creates innovative BOT WHATSAPP products and technical solutions. To date, their ingenuity has resulted in the development of \n*• HORIZON-MD-V1*(https://github.com/TECH-HORIZON-SCHOOL-OFFICIAL/HORIZON-MD)\n\n*• HORIZON-MD-V2*(https://github.com/TECH-HORIZON-SCHOOL-OFFICIAL/HORIZON-MD-V2)\n\n\n> *© ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜ-ʜᴏʀɪᴢᴏɴ*",

PROFILE_IMG: process.env.PROFILE_IMG || "https://files.catbox.moe/diz37z.jpg"

};
