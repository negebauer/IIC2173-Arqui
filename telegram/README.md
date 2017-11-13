# Arquiyalt Telegram Bot

## Table Of Contents

- [Development](#development)
- [Environment variables](#environment-variables)
- [Add new command](#add-new-command)
  - [Define command](#define-command)
  - [Create handler](#create-handler)
  - [Link handler](#link-handler)
  - [Update bot command list](#update-bot-command-list) _Optional_
- [Contributors](#contributors)

## Development

Clone the repo and cd to `Telegram` directory

```bash
yarn
yarn dev
```

## Environment variables

|variable|default|use|
|:-:|:-:|:-:|
|API_URI|localhost:3000|api url|
|TOKEN|485892696:AAHOHg3Sk2CNUt_ArGuv09qxGv9eqJuiY78|telegram bot token|
|API_TELEGRAM_SECRET|apitelegramsecret|secret key shared between api and telegram|

## Add new command

In order to add a new command to the telegram bot 3 steps must be completed

1. Define the command key, summary and description
2. Create a handler for the command
3. Link the command with it's handler
4. Update bot in-chat command list _Optional_

How to do so?

### Define command

Open up [constants] and define your new command. You must edit `COMMAND` and `COMMAND_DESCRIPTION`.

On `COMMAND` you have to define a _key: value_ pair where `key` is how the command will be referenced on the project's code (Ej: `COMMAND.help`), `value` is the string that users will have to type to invoke this command (Ej: `/help`).

On `COMMAND_DESCRIPTION` you define the _summary_ and _description_ of the command. In order to do so you have to use the same key you defined on `COMMAND` (Ej: `[COMMAND.help]: { summary: '', description: ''}`). `summary` is the command definition that will be shown on chat when a user types `/`. `description` will be shown when the `/help` command is invoked (or `/help yourCommand`).

### Create handler

Go to [commands] and create a new file for your command. Use the same key you defined on `COMMAND` for this file's name (Ej: `help.js`). This is just convention. Go ahead and copy and paste this code:

```js
const invoke = async ctx => {
  return ctx.sendMarkdown(`The command ${ctx.command.name} was invoked`)
}

const answer = async ctx => {
  return ctx.sendMarkdown(`The command ${ctx.command.name} was answered`)
}

module.exports = async bot => bot.invoke(invoke).answer(answer)
```

`invoke` will be called when the command is invoked (Ej: `/help`). `answer` will be called when a user types after invoking a command (Ej: `/products` and then typing `1 2 3` will show products 1, 2 and 3). Both functions **must** return a _Promise_. `sendMarkdown` is a function that renders whatever string you pass it to markdown (created by the [markdown] middleware). You can use `axios` here to communicate with the `api`. It's already configured with the `baseUrl` and `Secret` header. You can just:

```js
const axios = require('axios')
axios.get('/products')  // Will fetch all products from api
```

### Link handler

Open [configCommands] and link your newly created command handler with it's command key. Edit the `configCommand` _Object_ adding your command key (Ej: `COMMAND.help`) and it's handler (Ej: `require('./commands/help')`) defining their connection (Ej: `[COMMAND.help]: require('./commands/help')`).

And you're done! You should be able to use your new command talking to the bots

Beware that currently we're working with only one bot (one **token**) so the production bot may answer your commands. You can check if a response comes from the dev bot if it's message starts with **DEV**.

### Update bot command list
_Optional_

In order for the bot to show all available commands when writing `/` on a telegram chat we must update the command list with [botfather]. In order to do so [@negebauer] must talk to [botfather]. Run `yarn botfather` on this folder and send the output to http://telegram.me/negebauer.

## Contributors:

- [@negebauer]

<!-- Links -->

[markdown]:src/middleware/markdown.js
[constants]:src/constants.js
[configCommands]:src/configCommands.js
[commands]:src/commands

[@negebauer]:https://github.com/negebauer

[botfather]:https://core.telegram.org/bots#3-how-do-i-create-a-bot
