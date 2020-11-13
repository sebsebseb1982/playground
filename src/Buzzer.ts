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
        this.buzzer.writeSync(Gpio.HIGH);
        setTimeout(
            () => {
                this.buzzer.writeSync(Gpio.LOW);
            },
            2000
        );
    }
}
new Buzzer().test();