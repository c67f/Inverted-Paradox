class Help extends Phaser.Scene {
    constructor() {
        super('helpScene')
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
        this.add.bitmapText(width*0.1, height*0.2, this.mainFont, 'Move around the overworld with the arrow keys', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.35, this.mainFont, 'In battle: Use the arrow keys to choose what character to use', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.45, this.mainFont, 'each turn, and Space to select.', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.55, this.mainFont, 'Then, choose what type of attack to have them use. ', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.65, this.mainFont, 'Not all characters may be able to use all types of attacks.', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.75, this.mainFont, 'Search the overworld to find the enemies to fight', 40).setOrigin(0)
        this.add.bitmapText(width*0.1, height*0.85, this.mainFont, 'and walk into them to start the battle!', 40).setOrigin(0)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('titleScene')
        }
    }

}