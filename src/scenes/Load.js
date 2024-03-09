class Load extends Phaser.Scene {
    constructor () {
        super("loadScene")
    }

    preload() {
        console.log("test")
        //load assets
        //this.load.path = "./assets"  

        this.load.image('background', './assets/BackgroundSimple.png')
        this.load.image('gumballCombat', './assets/GumballCombatSprite.png')
        this.load.image('anaisCombat', './assets/AnaisCombatSprite.png')
        this.load.image('darwinCombat', './assets/DarwinCombatSprite.png')
        //this.load.image('cursorMenu', './assets/CursorMenu.png'),
        //this.load.image('cursorParty', './assets/CursorParty.png')
        
        this.load.spritesheet('cursor', './assets/CursorSpritesheet.png', {
            frameWidth: 62,
            frameHeight: 36
        })

        this.load.spritesheet('leslieMonster', './assets/LeslieEnemy.png', {
            frameWidth: 640,
            frameHeight: 528
        })

        this.load.image('menuBox9Slice', './assets/MenuBox9Slice.png')
        this.load.image('combatMenuBox9Slice', './assets/CombatMenuBox9Slice.png')

        this.load.image('bananaPeel', './assets/BananaPeel.png')

        this.load.image('victory', './assets/VictoryImage.png')

        this.load.bitmapFont('pixelmix_bold_font', 'font/pixelmix.png', 'font/pixelmix.xml')
        this.load.bitmapFont('RPG_font', 'font/RPGFont.png', 'font/RPGFont.xml')

        this.load.audio('battle', './assets/BattleTheme.wav')
    }
    
    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //this.anims.create

        //this.add.bitmapText(200, 200, 'RPG_font', 'test', 32).setOrigin(0.5)
        window:localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        console.log("loadscene")
        this.scene.start("battleScene")
    }
}