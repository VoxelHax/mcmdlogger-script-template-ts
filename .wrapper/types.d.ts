declare const console: {
    log(...args: any[])
}

declare function manifest(manifest: {
    name: string
    version: string
    author?: string
    description?: string
    url?: string
    loggerVersion?: string
})

declare function command(name: string, callback: (command: string) => any)
declare function command(name: string, description: string, callback: (command: string) => any)
declare function command(name: string, usage: string, description: string, callback: (command: string) => any)
declare function playerJoin(callback: (player: Player) => any)
declare function players(): Player[]
declare function script(): {
    name: string
    version?: string
    author?: string
    description?: string
    url?: string
}

interface PlayerEventEmitter {
    on(event: 'message', callback: (message: string) => any)
    on(event: 'leave', callback: () => any)

    off(event: 'message', callback: (message: string) => any): boolean
    off(event: 'leave', callback: () => any): boolean
}

declare interface Player extends PlayerEventEmitter {
    name: string
    uuid: string
    version: string
    protocol: number
    ip: string
    statuses: string[]

    send(text: string)
    kick()
    kick(text: string)
    sudo(message: string)
    deaf(deaf: boolean): boolean
    mute(mute: boolean): boolean
}