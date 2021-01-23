const { ShardingManager } = require('discord.js');
const configs = require('./configs.json')
const manager = new ShardingManager('./bot.js', { token: configs.token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();