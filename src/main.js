//"use strict"

let config = {
    type:Phaser.AUTO,
    render: {
      pixelArt: true
    },
    width: 1080,
    height: 720,
    scene: [ Load, Title, Help, Overworld, Battle, PennyBattle, Victory, End ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
}
let game = new Phaser.Game(config)

let { width, height } = game.config
console.log("test")
//reserve keyboard bindings
let keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE, keyBACK
let itemsNum, gumballAtkNum, gumballMgNum, anaisAtkNum, anaisMgNum, anaisSciNum, darwinAtkNum, darwinMgNum
let leslieBeaten = 0