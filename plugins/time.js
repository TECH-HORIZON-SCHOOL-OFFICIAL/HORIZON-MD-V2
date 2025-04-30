const axios = require('axios'); 
const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch'); 

cmd({
    pattern: "time", 
    react: "✅", 
    desc: "Get the weather, and location for the city.", 
    category: "information", 
    filename: __filename,
},
async(conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const city = args.length > 0 ? args.join(" ") : "Kadawatha"; // Default to Bhakkar if no city is provided
        const apiUrl = `https://api.nexoracle.com/islamic/prayer-times?city=${city}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return reply('Error fetching prayer times!');
        }

        const data = await response.json();

        if (data.status !== 200) {
            return reply('Failed to get prayer times. Please try again later.');
        }

        const prayerTimes = data.result.items[0];
        const weather = data.result.today_weather; // Weather data
        const location = data.result.city; // Location name

        // Building the message content
        let dec = `*Location details: ${location}, ${data.result.state}*\n\n`;
        dec += `📍 *Location*: ${location}, ${data.result.state}, ${data.result.country}\n`;

        dec += `🌄 *sunrise time*: ${prayerTimes.shurooq}\n`;
        dec += `☀️ *afternoon time*: ${prayerTimes.dhuhr}\n`;
        dec += `🌇 *evening time*: ${prayerTimes.asr}\n`;
        dec += `🌆 *Sunset time*: ${prayerTimes.maghrib}\n`;
        dec += `🌃 *Nightfall*: ${prayerTimes.isha}\n`;

        const temperature = weather.temperature !== null ? `${weather.temperature}°C` : 'Data not available';
        dec += `🌡️ *Temperature*: ${temperature}\n`;

        // Sending the image with the caption and context info
                await conn.sendMessage(m.chat, {
            image: {url: config.ALIVE_IMG}, // Assurez-vous que l'URL est valide
            caption: dec,
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

    } catch (e) {
        console.log(e);
        reply('*Error occurred while fetching prayer times and weather.*');
    }
});