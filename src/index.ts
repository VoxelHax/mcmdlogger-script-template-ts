playerJoin(player => {
    player.send('Hi!')
})

command('helloworld', '<player>', 'Sends "Hello World" message to specific player', command => {
    const args = command.split(' ')
    if (args.length !== 1 || command === '') return console.log('Invalid args')
    const username = args[0]
    const player = players().find(p => p.name === username)
    if (!player) return console.log('Player not found')
    player.send('§aHello world!')
    console.log('Message sent')
})