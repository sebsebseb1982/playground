const Gpio = require('onoff').Gpio;

export class Buzzer {
    private buzzer;

    constructor() {
        this.buzzer = new Gpio(26, 'out');
        process.on('SIGINT', _ => {
            this.buzzer.unexport();
        });
    }

    test() {
        // Toggle the state of the LED connected to GPIO17 every 200ms
        const iv = setInterval(_ => this.buzzer.writeSync(this.buzzer.readSync() ^ 1), 1);

// Stop blinking the LED after 5 seconds
        setTimeout(_ => {
            clearInterval(iv); // Stop blinking
            this.buzzer.unexport();    // Unexport GPIO and free resources
        }, 5000);
    }
}

new Buzzer().test();