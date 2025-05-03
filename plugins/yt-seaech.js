const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');

cmd({
    pattern: "yts",
    alias: "ytsearch",
    desc: "button test",
    react: "📨",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    if (!q) return reply(`*Need title*`);
        let search = await yts(q);
        let videos = search.all;
        console.log(videos)
        if (!videos || videos.length === 0) {
          reply('No video found');
          return;
        }
        // Choose between 1 and 5 videos at random
        const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
        const selectedVideos = [];
        while (selectedVideos.length < numVideos) {
          const randomIndex = Math.floor(Math.random() * videos.length);
          const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
          selectedVideos.push(randomVideo);
        }
        let push = [];
        for (let i = 0; i < selectedVideos.length; i++) {
          let video = selectedVideos[i];
          let cap = `ᴛɪᴛʟᴇ : ${video.title} \nᴅᴜʀᴀᴛɪᴏɴ : ${video.timestamp} \nᴠɪᴇᴡꜱ : ${video.views} \nᴀɢᴏ : ${video.ago}`;
          let foot = `> *© ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜ-ʜᴏʀɪᴢᴏɴ*`;
          const mediaMessage = await prepareWAMessageMedia({ image: { url: video.thumbnail } }, { upload: conn.waUploadToServer });
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: cap
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: foot
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `Video ${i + 1}`,
              subtitle: '',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  "name": "cta_copy",
                  "buttonParamsJson": `{"display_text":"Copy Url 📑","id":"1234","copy_code":"${video.url}"}`
                }
              ]
            })
          });
        }
        let sadee = `𝙷𝙾𝚁𝙸𝚉𝙾𝙽 𝙼𝙳`;
        let foot2 = `> *© ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜ-ʜᴏʀɪᴢᴏɴ*`;
        const msg = generateWAMessageFromContent(from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: sadee
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: foot2
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: push
                }),
                contextInfo: {
                      mentionedJid: ['94743706283@s.whatsapp.net'], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363401051383340@newsletter',
                      newsletterName: '𝚃𝙴𝙲𝙷-𝙷𝙾𝚁𝙸𝚉𝙾𝙽',
                      serverMessageId: 143
                    }
                    }
              })
            }
          }
        }, {quoted:mek});
        await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
