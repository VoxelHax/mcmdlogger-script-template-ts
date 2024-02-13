declare const console: {
    log(...args: any[]): void
    warn(...args: any[]): void
    error(...args: any[]): void
    emit(message: string, includeInLogFile: boolean, payload?: string): void
}

declare function manifest(manifest: {
    name: string
    version: string
    author?: string
    description?: string
    url?: string
    loggerVersion?: string
}): void
declare function command(name: string, callback: (command: string) => any): void
declare function command(name: string, description: string, callback: (command: string) => any): void
declare function command(name: string, usage: string, description: string, callback: (command: string) => any): void
declare function playerJoin(callback: (player: Player) => any): void
declare function exposeCallback(name: string, callback: (payload: string) => any): void
declare function players(): Player[]
declare function script(): {
    name: string
    version?: string
    author?: string
    description?: string
    url?: string
}
declare function target(): {
    address: { resolved: string, input: string } | null
}
declare function colors(): {
    colorsAvailable: boolean
    reset: string, black: string, darkRed: string, darkGreen: string, darkYellow: string, darkBlue: string
    darkPurple: string, darkCyan: string, lightGray: string, gray: string, red: string, green: string, yellow: string
    blue: string, purple: string, cyan: string, white: string
}
declare function file(...path: string[]): File
declare function setTimeout(callback: () => any, delay: number): number
declare function clearTimeout(id: number): void
declare function setInterval(callback: () => any, delay: number): number
declare function clearInterval(id: number): void

declare interface File {
    path: string
    segments: string[]
    resolve(...path: string[]): File
    exists(): boolean
    isDir(): boolean
    isFile(): boolean
    read(): string
    write(content: string): void
    append(content: string): void
    mkdirs(): void
    delete(recursive?: boolean): void
    listFiles(): string[]
    listDirs(): string[]
}

declare interface TextComponent {
    text: string
    color?: string
    bold?: boolean
    italic?: boolean
    underlined?: boolean
    strikethrough?: boolean
    obfuscated?: boolean
    insertion?: string
    clickEvent?: {
        action: string
        value: string
    }
    hoverEvent?: {
        action: string
        value: string
    }
    extra?: TextComponent[]
}

declare interface EventPlayerMessage {
    text: string
    canceled: boolean
    cancel(): void
}

declare interface EventServerMessage {
    json: TextComponent
    legacy: string
    text: string
    click_actions: { [key in 'open_url' | 'open_file' | 'run_command' | 'suggest_command' | 'change_page' | 'copy_to_clipboard']?: string[] }
    canceled: boolean
    cancel(): void
}

declare interface EventPacket {
    id: number
    name: string
    canceled: boolean
    cancel(): void
}

declare interface PlayerEventEmitter {
    on(event: 'player_message', callback: (event: EventPlayerMessage) => any): void
    on(event: 'server_message', callback: (event: EventServerMessage) => any): void
    on(event: 'player_packet', callback: (event: EventPacket) => any): void
    on(event: 'server_packet', callback: (event: EventPacket) => any): void
    on(event: 'leave', callback: () => any): void

    off(event: 'player_message', callback: (event: EventPlayerMessage) => any): boolean
    off(event: 'server_message', callback: (event: EventServerMessage) => any): boolean
    off(event: 'player_packet', callback: (event: EventPacket) => any): boolean
    off(event: 'server_packet', callback: (event: EventPacket) => any): boolean
    off(event: 'leave', callback: () => any): boolean
}

declare interface OperationResult {
    success: boolean
    message: string
    input_data: any
    output_data: any
    warns: any[]
}

declare interface Player extends PlayerEventEmitter {
    name: string
    uuid: string
    version: string
    protocol: number
    ip: string
    statuses: string[]

    send(text: string): OperationResult
    sendJSON(message: TextComponent | string): OperationResult
    kick(): OperationResult
    kick(text: string): OperationResult
    sudo(message: string): OperationResult
    fakegm(gamemode: number): OperationResult
    deaf(deaf: boolean): boolean
    mute(mute: boolean): boolean
    getCoords(): { x: number, y: number, z: number, onGround: boolean, sinceUpdate: number } | null
}
