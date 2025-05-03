const config = require('../config')
const { cmd } = require("../command");
const moment = require("moment");

let botStartTime = Date.now(); 

cmd({
    pattern: "alive2",
    desc: "Check if the bot is active.",
    category: "info",
    react: "🤖",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User"; // Nom de l'utilisateur ou valeur par défaut
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
🌟 *𝗛𝗢𝗥𝗜𝗭𝗢𝗡 𝗠𝗗 𝗦𝗧𝗔𝗧𝗨𝗦* 🌟
👋🏻 𝗛𝗲𝘆 *${pushname}*
🕒 𝗧𝗶𝗺𝗲: *${currentTime}*
📅 𝗗𝗮𝘁𝗲: *${currentDate}*
⏳ 𝗨𝗽𝘁𝗶𝗺𝗲: *${runtimeHours} 𝗵𝗼𝘂𝗿𝘀, ${runtimeMinutes} 𝗺𝗶𝗻𝘂𝘁𝗲𝘀, ${runtimeSeconds} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀*

> *© ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜ-ʜᴏʀɪᴢᴏɴ*`.trim();

        // Envoyer le message avec image et légende
        await conn.sendMessage(from, {
            image: {url: config.ALIVE_IMG}, // Assurez-vous que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401051383340@newsletter',
                    newsletterName: '𝚃𝙴𝙲𝙷-𝙷𝙾𝚁𝙸𝚉𝙾𝙽',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        // Répondre avec des détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
          