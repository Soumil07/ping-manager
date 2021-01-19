import { OWNER_ID } from '@root/config';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export default class extends Precondition {

	public async run(message: Message) {
		return message.author.id === OWNER_ID
			? this.ok()
			: this.error(this.name, 'This command can only be used by the owner.');
	}

}