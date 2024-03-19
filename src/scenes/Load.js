class Load extends Phaser.Scene {
    constructor () {
        super("loadScene")
    }

    preload() {
        console.log("test")
        //load assets
        //this.load.path = "./assets"  

        this.load.image('titleScreen', './assets/titleScreen.png')

        this.load.spritesheet('gumballOverworld', './assets/GumballSprite.png', {
            frameWidth: 85,
            frameHeight: 123
        })
        this.load.spritesheet('anaisOverworld', './assets/AnaisMapSprite.png', {
            frameWidth: 102,
            frameHeight: 115
        })
        this.load.spritesheet('darwinOverworld', './assets/DarwinMapSprite.png', {
            frameWidth: 104,
            frameHeight: 139
        })

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
        this.load.spritesheet('pennyMonster', './assets/PennyEnemy.png', {
            frameWidth: 447,
            frameHeight: 640
        })

        this.load.image('menuBox9Slice', './assets/MenuBox9Slice.png')
        this.load.image('combatMenuBox9Slice', './assets/CombatMenuBox9Slice.png')

        this.load.spritesheet('leafAtk', './assets/LeslieLeafAtk.png', {
            frameWidth: 200,
            frameHeight: 50
        })
        this.load.image('vineAtk', './assets/LeslieVineAttack.png')

        this.load.spritesheet('zapAtk', './assets/ZapAtk.png', {
            frameWidth: 120,
            frameHeight: 30
        })

        //attack images:
        this.load.image('bananaPeel', './assets/BananaPeel.png')
        this.load.spritesheet('gumballMagic1', './assets/GumballMagic1.png', {
            frameWidth: 320,
            frameHeight: 222
        })
        this.load.spritesheet('gumballMagic2', './assets/GumballMagic2.png', {
            frameWidth: 320,
            frameHeight: 182
        })
        //this.load.spritesheet('gumballMagic1')


        this.load.image('victory', './assets/VictoryImage.png')

        this.load.bitmapFont('pixelmix_bold_font', 'font/pixelmix.png', 'font/pixelmix.xml')
        this.load.bitmapFont('RPG_font', 'font/RPGFont.png', 'font/RPGFont.xml')

        this.load.audio('battle', './assets/BattleTheme.wav')

        
    }
    
    create(){
        this.anims.create({  //turns out animations can't be in preload with the textures they use
            key: 'gMagic1Start',
            framerate: 9,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('gumballMagic1', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'gMagic1Loop',
            framerate: 9,
            repeat: 3,
            frames: this.anims.generateFrameNumbers('gumballMagic1', {
                start: 2,
                end: 4
            })
        })
        this.anims.create({
            key: 'gMagic2',
            framerate: 9,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('gumballMagic2', {
                start: 0,
                end: 5
            })
        })

        this.anims.create({
            key: 'leafAtkStart',
            framerate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('leafAtk', {
                start: 0,
                end: 14
            })
        })
        this.anims.create({
            key: 'leafAtkFinish',
            framerate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('leafAtk', {
                start: 15,
                end: 20
            })
        })

        this.anims.create({
            key: 'zapAtk',
            framerate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('zapAtk',{
                start: 0,
                end: 8
            })
        })

        this.anims.create({
            key: 'anaisWalk',
            framerate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('anaisOverworld', {
                start: 0,
                end: 1
            })

        })
        /*this.anims.create({
            key: 'darwinWalk',
            framerate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('darwinOverworld', {
                start: 0,
                end: 1
            })

        })*/

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //this.anims.create

        //this.add.bitmapText(200, 200, 'RPG_font', 'test', 32).setOrigin(0.5)
        window:localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        console.log("loadscene")
        this.scene.start('titleScene')
        //this.scene.start("overworldScene")
        //this.scene.start("battleScene")
    }
}