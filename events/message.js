const { Events, EmbedBuilder, MessageType } = require('discord.js');
const fs = require("fs")
const ffmpeg = require('fluent-ffmpeg');
module.exports = {
    name: "messageCreate",
    async execute(message) {
        // Steal stickers
        // ! if the sticker is animated this will not work, and will only supply a png.
        if(message.content.includes("^steal^") && message.type == MessageType.Reply){
            const stickerMessage = await message.fetchReference()
            if(stickerMessage.stickers.firstKey() != null){
                const stickerURL = stickerMessage.stickers.get(stickerMessage.stickers.firstKey())
                await message.reply(stickerURL.url)
            }
        }


    }
};