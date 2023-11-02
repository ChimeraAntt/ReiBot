const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("conversion")
        .setDescription("convert units (Will be updated)")
        .addStringOption((option) => option
            .setName("unit")
            .setDescription("What kind of unit would you like to convert")
            .setRequired(true)
            .addChoices(
                {name: "Help", value: "help"},
                {name: "Weather", value: "weather"}
            ))
        .addStringOption((option) => option
            .setName("value")
            .setDescription("Put the value to be converted here, format: \"32C\" or \"18m\"")),
    async execute(interaction){
        const unit = interaction.options.getString('unit');
        const value = interaction.options.getString('value');
        function ktc(k){
            return (+k-273.15);
        }
        function ktf(k){
            return((9/5)*(k-273.15) + 32);
        }
        function ftc(f){
            return((f-32)*(5/9));
        }
        function ftk(f){
            return(ftc(f)+273.15);
        }
        function ctf(c){
            return(c*(9/5)+32);
        }
        function ctk(c){ 
            return(+c+273.15);
        }

        if(unit === 'help'){
            const embed = new EmbedBuilder()
                .setTitle('Help Menu')
                .setDescription('This is a help menu to help with conversion stuff')
                .addFields(
                    {name: "Weather", value: "Weather can use any of these 3: Celcius(C), Fahrenheit(F), and Kelvin(K)!"}
                )
            await interaction.reply({ embeds : [embed], fetchReply : true});
        }else if(unit === 'weather'){
            const t = value.slice(-1);
            const u = value.slice(0,-1);
            switch(t){
                case "C":
                    const cf = ctf(u).toFixed(2).toString();
                    const ck = ctk(u).toFixed(2).toString();
                    const cEmbed = new EmbedBuilder()
                        .setTitle('Celcius')
                        .setFields(
                            {name: "Celcius to Fahrenheit", value: cf},
                            {name: "Celcius to Kelvin", value: ck}
                        );
                    await interaction.reply({ embeds : [cEmbed], fetchReply : true});
                case "F":
                    const fc = ftc(u).toFixed(2).toString();
                    const fk = ftk(u).toFixed(2).toString();
                    const fEmbed = new EmbedBuilder()
                        .setTitle('Fahrenheit')
                        .setFields(
                            {name: "Fahrenheit to Celcius", value: fc},
                            {name: "Fahrenheit to Kelvin", value: fk},
                        );
                    await interaction.reply({ embeds : [fEmbed], fetchReply : true});
                case "K":
                    const kc = ktc(u).toFixed(2).toString();
                    const kf = ktf(u).toFixed(2).toString();
                    const kEmbed = new EmbedBuilder()
                        .setTitle('Kelvin')
                        .setFields(
                            {name: "Kelvin to Fahrenheit", value: kf},
                            {name: "Kelvin to Celcius", value: kc},
                        );
                    await interaction.reply({ embeds : [kEmbed], fetchReply : true});
                default:
                    await interaction.reply("Something went wrong?")
            }
        }
    },
};