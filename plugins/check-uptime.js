const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    react: "🔰",
    alias: ["uptime" ,"runtime"],
    desc: "cheack uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
┏━━━━━━━━━━━━━━━━━━┓
┃  🔰 HORIZON MD UPTIME   ┃
┗━━━━━━━━━━━━━━━━━━┛

◈ ⏰ UPTIME : *${runtime(process.uptime())}*
◈ 📟 RAM USAGE : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
◈ ⚙️ PLATFORM : *heroku*
◈ 🧬 VERSION : *2.0.0*

> *© ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜ-ʜᴏʀɪᴢᴏɴ*`

await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401051383340@newsletter',
                    newsletterName: '𝚃𝙴𝙲𝙷-𝙷𝙾𝚁𝙸𝚉𝙾𝙽',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
             
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/TECH-HORIZON-OWNER/PROJECT-FSD/raw/refs/heads/main/audio/01.mp3' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

}catch(e){
console.log(e)
reply(`${e}`)
}
})