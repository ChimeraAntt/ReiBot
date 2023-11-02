const { Events, EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.content.includes("Hello Gordon")){
            await message.reply("A Chair is a piece of Furniture with a raised surface supported by legs, commonly used to seat a single person. Chairs are support most often by four legs and have a back; however, a chair can have three legs or can have a different shape. Chairs are made of a wide variety of materials, ranging from wood to metal to synthetic material (e.g. plastic), and they may be padded or upholstered in various colors and fabrics, either just on the seat (as with some dining room chairs) or on the entire chair. Chairs are used in a number of rooms in homes (e.g. in living rooms, dining rooms, and dens), in schools and offices (with desks), and in various other workplaces. A chair without a back or arm rests is a stool , or when raised up, a bar stool. A chair with arms is an armchair ; one with upholstery, reclining action, and a fold-out footrest is a recliner. A permanently fixed chair in a train or theater is a seat or, in an airplane, airline seat; when riding, it is a saddle or bicycle saddle; and for an automobile, a car seat or infant car seat. With wheels it is a wheelchair; or when hung from above, a swing, An upholstered, padded chair for two people is a 'loveseat', while if it is for more than two person it is a couch, sofa, or a setee; or if is not upholstered, a bench. A seperate footrest for a chair, usually upholstered, is known as an ottoman, hassock, or pouffe.")
        }


        const mess = ["C", "F", "K"];
        if(mess.some(word => message.content.includes(word)) && message.content.includes("to")){
            const temp = message.content.split(" ");
            let isCommand;
            if (temp.length === 4){
                isCommand = true;
            }
            if(isCommand){
                const number = temp[0];
                const from = temp[1].toLowerCase();
                const to = temp[3].toLowerCase();
                let response;
                if(from === "k"){
                        if(to === "k"){
                            response = number;
                        }else if(to === "c"){
                            response = (+number-273.15).toFixed(2);
                        }else if(to === "f"){
                            response = ((9/5)*(number-273.15) + 32).toFixed(2);
                        }
                }else if(from === "c"){
                    if(to === "k"){
                        response = (+number+273.15);
                    }else if(to === "c"){
                        response = number;
                    }else if(to === "f"){
                        response = (number*(9/5)+32);
                    }
                }else if(from === "f"){
                    if(to === "k"){
                            response = (((number-32)*(5/9))+273.15)
                        }else if(to === "c"){
                            response = ((number-32)*(5/9))
                        }else if(to === "f"){
                            response = number;
                        }
                }else{
                    response = "An Error Occurred";
                }
                await message.reply(response.toFixed(2).toString() + to.toUpperCase());}
        }
    }
};