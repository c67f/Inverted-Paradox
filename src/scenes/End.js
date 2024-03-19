class End extends Phaser.Scene {
    constructor() {
        super('endScene')
    }
    
    init() {
        this.mainFont = 'RPG_font'

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    }

    create() {
        this.add.rectangle(0, 0, width, height, 0x8D9ABA).setOrigin(0, 0)
        this.add.bitmapText(width*0.5, height*0.1, this.mainFont, 'Credits', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.25, this.mainFont, 'Game creation: Cal Friedman', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.35, this.mainFont, 'Game Concept: The Amazing World of Gumball, S5E18, The Console', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.45, this.mainFont, 'Music: Cal Friemdan, using beepbox.co', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.55, this.mainFont, 'Sprites: Party and enemy sprites taken from episode with ', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.65, this.mainFont, 'mostly minor or no changes, attack sprites created by me', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.75, this.mainFont, 'Overworld taken from episode', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.85, this.mainFont, 'Press space to restart', 40).setOrigin(0)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('titleScene')
        }
    }

}