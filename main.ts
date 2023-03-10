function RIDE (SMER: number, OTACENI: number, V_V: number) {
    if (OTACENI == 1) {
        if (SMER == 1) {
            if (V_V == 1) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, SPEED * 10)
                maqueen.motorStop(maqueen.Motors.M1)
            } else if (V_V == 2) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, SPEED * 10)
                maqueen.motorStop(maqueen.Motors.M1)
            }
        } else if (SMER == 2) {
            if (V_V == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, SPEED * 10)
                maqueen.motorStop(maqueen.Motors.M2)
            } else if (V_V == 2) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, SPEED * 10)
                maqueen.motorStop(maqueen.Motors.M2)
            }
        } else if (SMER == 3) {
            if (V_V == 1) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, SPEED * 10)
            } else if (V_V == 2) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, SPEED * 10)
            }
        }
    } else if (OTACENI == 2) {
    	
    } else if (OTACENI == 3) {
    	
    }
}
makerbit.onIrDatagram(function () {
    IR2 = makerbit.irButton()
    if (IR2 == 176) {
        maqueen.motorStop(maqueen.Motors.All)
        DIRECT = 0
    } else if (IR2 == 128) {
        SPEED = 1
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 64) {
        SPEED = 2
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 192) {
        SPEED = 3
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 32) {
        SPEED = 4
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 160) {
        SPEED = 5
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 96) {
        SPEED = 6
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 224) {
        SPEED = 7
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 16) {
        SPEED = 8
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 144) {
        SPEED = 9
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 0) {
        SPEED = 10
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 138) {
        if (SPEED < 10) {
            SPEED += 1
            RIDE(DIRECT, T_MODE, B_F)
        }
    } else if (IR2 == 74) {
        if (SPEED > 1) {
            SPEED += -1
            RIDE(DIRECT, T_MODE, B_F)
        }
    } else if (IR2 == 208) {
        DIRECT = 3
        B_F = 1
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 112) {
        DIRECT = 3
        B_F = 2
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 136) {
        DIRECT = 1
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 8) {
        DIRECT = 2
        RIDE(DIRECT, T_MODE, B_F)
    } else if (IR2 == 130) {
        if (LOADER <= 30) {
            LOADER = 20
        } else {
            LOADER += -10
        }
        maqueen.servoRun(maqueen.Servos.S1, LOADER)
    } else if (IR2 == 66) {
        if (LOADER >= 110) {
            LOADER = 120
        } else {
            LOADER += 10
        }
        maqueen.servoRun(maqueen.Servos.S1, LOADER)
    } else if (IR2 == 80) {
        if (POLICE == 0) {
            POLICE = 1
            PAINT(1)
        } else {
            POLICE = 0
            PAINT(LOGO)
        }
    } else {
    	
    }
})
function PAINT (FACE: number) {
    if (FACE == 0) {
        basic.clearScreen()
    } else if (FACE == 1) {
        basic.showLeds(`
            . . # . .
            # . . . #
            . # # # .
            # . . . #
            # # # # #
            `)
    }
}
let IR2 = 0
let LOGO = 0
let LOADER = 0
let DIRECT = 0
let T_MODE = 0
let B_F = 0
let SPEED = 0
let POLICE = 0
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
let LEDKY = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
let LED_FL = LEDKY.range(0, 0)
let LED_FR = LEDKY.range(3, 0)
let LED_BL = LEDKY.range(1, 0)
let LED_BR = LEDKY.range(2, 0)
POLICE = 0
SPEED = 5
B_F = 1
T_MODE = 1
DIRECT = 0
LOADER = 70
LOGO = 0
PAINT(LOGO)
maqueen.servoRun(maqueen.Servos.S1, LOADER)
music.setVolume(43)
basic.forever(function () {
    if (POLICE == 0) {
        LEDKY.clear()
        music.stopAllSounds()
        LEDKY.clear()
    } else if (POLICE == 1) {
        LED_FL.showColor(neopixel.colors(NeoPixelColors.Blue))
        LED_FR.showColor(neopixel.colors(NeoPixelColors.Blue))
        LED_BL.showColor(neopixel.colors(NeoPixelColors.Red))
        LED_BR.showColor(neopixel.colors(NeoPixelColors.Red))
        music.playTone(330, music.beat(BeatFraction.Quarter))
        POLICE = 2
    } else if (POLICE == 2) {
        LED_FL.showColor(neopixel.colors(NeoPixelColors.Red))
        LED_FR.showColor(neopixel.colors(NeoPixelColors.Red))
        LED_BL.showColor(neopixel.colors(NeoPixelColors.Blue))
        LED_BR.showColor(neopixel.colors(NeoPixelColors.Blue))
        music.playTone(440, music.beat(BeatFraction.Quarter))
        POLICE = 1
    }
})
