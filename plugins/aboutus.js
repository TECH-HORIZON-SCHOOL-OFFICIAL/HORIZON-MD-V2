/* 
created by TECH HORIZON SCHOOL OFFICIAL
contact me 94743706283
© Copy coder alert ⚠
*/

const config = require('../aboutus')
const {cmd , commands} = require('../command')
cmd({
    pattern: "my",
    alias: ["about","aboutus"],
    react: "💀",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `${config.YOUR_DETAILS}`

await conn.sendMessage(from, {
            image: {url: config.PROFILE_IMG}, // Assurez-vous que l'URL est valide
            caption: about,
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

}catch(e){
console.log(e)
reply(`${e}`)
}
})