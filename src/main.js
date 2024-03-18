//"use strict"

let config = {
    type:Phaser.AUTO,
    render: {
      pixelArt: true
    },
    width: 1080,
    height: 720,
    scene: [ Load, Overworld, Battle, PennyBattle, Victory ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    }
}
let game = new Phaser.Game(config)

let { width, height } = game.config
console.log("test")
//reserve keyboard bindings
let keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE, keyBACK
let itemsNum, gumballAtkNum, gumballMgNum, anaisAtkNum, anaisMgNum, anaisSciNum, darwinAtkNum, darwinMgNum