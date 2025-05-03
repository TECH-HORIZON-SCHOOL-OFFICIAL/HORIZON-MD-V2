const { sleep } = require('../lib/functions');
const config = require('../config')
const { cmd, commands } = require('../command')


// JawadTechX

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {

        if (!isGroup) {
            return reply("ᴛʜɪᴀ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ɪɴ ɢʀᴏᴜᴩꜱ.");
        }
        

        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜꜱᴇ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ.");
        }

        reply("ʟᴇᴀᴠɪɴꜰ ɢʀᴏᴜᴩ...");
        await sleep(1500);
        await conn.groupLeave(from);
        reply("ɢᴏᴏᴅʙʏᴇ! 👋");
    } catch (e) {
        console.error(e);
        reply(`❌ ᴇʀᴏʀʀ: ${e}`);
    }
});

