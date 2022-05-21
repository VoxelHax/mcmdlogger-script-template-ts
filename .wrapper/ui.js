import 'colors'

let currentStep = null

const animation = ['-', '\\', '|', '/']
const animationInterval = 130

class Step {
    constructor(name) {
        this.name = name
        this.animationState = 0
        this.animation = setInterval(() => {
            this.animationState = (this.animationState + 1) % animation.length
            this.update()
        }, animationInterval)
        this.startTime = Date.now()
        process.stdout.write(this.name.cyan + '...'.gray + ' ' + animation[this.animationState].white)
    }

    update() {
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(this.name.cyan + '...'.gray + ' ' + animation[this.animationState].white)
    }

    done(success) {
        const finishTime = Date.now()
        clearInterval(this.animation)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        if (success)
            process.stdout.write(this.name.green + ' ' + `(${finishTime - this.startTime}ms)`.white + '\n')
        else
            process.stdout.write(this.name.red + ' ' + `(${finishTime - this.startTime}ms)`.white + '\n')
    }
}

export function step(name) {
    if (currentStep) done()
    currentStep = new Step(name)
}

export function done(success) {
    if (!currentStep) return
    currentStep.done(success === undefined ? true : !!success)
    currentStep = null
}