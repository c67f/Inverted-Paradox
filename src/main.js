//"use strict"

let config = {
    type:Phaser.AUTO,
    width: 1080,
    height: 720,
    scene: [ Load, Battle ],
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