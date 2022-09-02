import CommandInterface from '../command.interface';
import { Service } from 'typedi';
import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { SubCommand } from '../sub-command.type';
import { Subject } from 'rxjs';
import { InteractionHandler } from '../interaction-handler.type';
import DrinksJson from '../data/drinks.json';

@Service()
export default class DrinkCommand implements CommandInterface {
    command = 'drink'; // Name of the command
    subCommands = new Array<SubCommand>();
    interactionHandlers = new Array<InteractionHandler>();
    subCommandSubject = new Subject<ChatInputCommandInteraction>();

    async init() {
        return;
    }

    async runCommand(interaction: ChatInputCommandInteraction) {
        const drink = DrinksJson[Math.floor(Math.random() * DrinksJson.length)];

        const embed = new EmbedBuilder()
            .setTitle(drink['title'])
            .setURL(drink['url'])
            .addFields(
                { name: 'Ingredients', value: drink['ingredients'].map((x: string) => '\u2022' + ` ${x}`).join('\n') },
                { name: 'Directions', value: drink['directions'] },
            );
        // .setFooter({ text: `` })
        // .setColor(changeColor);

        await interaction.reply({ embeds: [embed] });
        return;
    }

    slashCommandBuilder(): SlashCommandSubcommandsOnlyBuilder | SlashCommandBuilder {
        return new SlashCommandBuilder().setName('drink').setDescription('Displays a random cocktail.');
    }
}
