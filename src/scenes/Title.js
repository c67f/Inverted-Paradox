class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
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
        this.add.sprite(0,0, 'titleScreen').setOrigin(0)
        this.add.bitmapText(width*0.3, height*0.8, this.mainFont, 'Press Left for Help', 40).setOrigin(0.5)
        this.add.bitmapText(width*0.7, height*0.8, this.mainFont, 'Press Space to Start', 40).setOrigin(0.5)
        this.add.bitmapText(width*0.5, height*0.9, this.mainFont, 'Press Right to see end credits', 40).setOrigin(0.5)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('helpScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('overworldScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('endScene')
        }
    }

}