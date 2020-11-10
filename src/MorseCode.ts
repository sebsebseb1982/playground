const Gpio = require('onoff').Gpio;

const morseCode = {
    a: "·−",
    b: "−···",
    c: "−·−·",
    d: "−··",
    e: "·",
    f: "··−·",
    g: "−−·",
    h: "····",
    i: "··",
    j: "·−−−",
    k: "−·−",
    l: "·−··",
    m: "−−",
    n: "−·",
    o: "−−−",
    p: "·−−·",
    q: "−−·−",
    r: "·−·",
    s: "···",
    t: "−",
    u: "··−",
    v: "···−",
    w: "·−−",
    x: "−··−",
    y: "−·−−",
    z: "−−··",
    0: "−−−−−",
    1: "·−−−−",
    2: "··−−−",
    3: "···−−",
    4: "····−",
    5: "·····",
    6: "−····",
    7: "−−···",
    8: "−−−··",
    9: "−−−−·"
};

const dotLength = 100;

class MorseCode {
    private laser;
    private nextCharTime = 0;

    constructor() {
         this.laser = new Gpio(26, 'out');

        process.on('SIGINT', _ => {
            this.laser.unexport();
        });
    }

    translate(stringToTranslate: String) {
        for (let i = 0; i < stringToTranslate.length; i++) {
            let char = stringToTranslate.normalize("NFD")[i];

            this.displayMorseSequence(morseCode[char]);
        }
    }

    displayMorseSequence(morseSequence: String) {

        if (morseSequence) {
            for (let i = 0; i < morseSequence.length; i++) {
                let beep = morseSequence[i];

                let beepDuration;
// 1 3 7
                switch (beep) {
                    case '−' :
                        beepDuration = 3 * dotLength;
                        break;
                    case '·' :
                        beepDuration = dotLength;
                        break;
                }
                setTimeout(
                    () => {
                        this.impulse(beepDuration);
                    },
                    this.nextCharTime
                );
                this.nextCharTime += (beepDuration + dotLength);
            }
        } else {
            this.nextCharTime += 7 * dotLength;
        }
    }

    impulse(durationInMs: number) {
         this.laser.writeSync(Gpio.HIGH);
        setTimeout(
            () => {
                this.laser.writeSync(Gpio.LOW);
            },
            durationInMs
        );
    }
}

new MorseCode().translate("coucou ca va");