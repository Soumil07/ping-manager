require('module-alias/register');

import { TOKEN } from '@root/config';
import { Store } from '@sapphire/framework';
import PingManagerClient from './lib/structures/PingManagerClient';
import '@sapphire/plugin-logger/register';

Store.defaultStrategy.onLoadAll = (store: Store<any>) => store.context.client.logger.debug(`Loaded ${store.size} ${store.name}`);

const client = new PingManagerClient({
    caseInsensitiveCommands: true,
    defaultPrefix: 'p!'
});
client.login(TOKEN);