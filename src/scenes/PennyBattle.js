class PennyBattle extends Phaser.Scene {
    constructor() {
        super("pennyBattleScene")
    }

    init() {
        this.dmgFont = 'pixelmix_bold_font'
        this.mainFont = 'RPG_font'
        this.HPTextX = 160
        this.HPTextY = height - 150
        this.labelSize = 36

        this.charMenuX = width/2
        this.charMenuY = this.HPTextY - 50

        this.cursorStartX = width/2.8
        this.cursorStartY = height*0.42
        this.cursorPartyMoveInterval = 130
        this.cursorMenuX = this.charMenuX  + 10
        this.cursorMenuY = this.charMenuY + 64
        this.cursorMenuMoveInterval = 36

        this.enemyStartX = width*0.8
        this.enemyStartY = height*0.5

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)

        //placeholder
        this.itemsNum = 2
        //gumballAtkNum = 1
        this.gMagicNum = 2
        //anaisAtkNum = 1
        this.aMagicNum = 1
        this.aSciNum = 2
        //darwinAtkNum = 1
        this.dMagicNum = 2

        //Combat stats:
        this.gHP = 700
        this.gMagic = 8
        this.gScience = 2
        
        this.aHP = 700
        this.aMagic = 5
        this.aScience = 15
        
        this.dHP = 700
        this.dMagic = 10
        this.dScience = 3
        
        //Enemy vars:
        //this.eHP = 1200

        this.playerTurn = true
        this.enemyTurn = false
    }

    create() {
        console.log("battlescene")

        //this.keys = this.input.keyboard.createCursorKeys()

        this.background = this.add.sprite(0, 0, 'background').setOrigin(0)
        this.gumballCombat = this.add.sprite(width/2.8, height*0.6, 'gumballCombat').setOrigin(0.5)
        this.anaisCombat = this.add.sprite(width/4.3, height*0.6, 'anaisCombat').setOrigin(0.5)
        this.darwinCombat = this.add.sprite(width/8, height*0.6, 'darwinCombat').setOrigin(0.5)
        //this.cursorParty = this.add.sprite(width/2.8, height*0.42, 'cursorParty').setOrigin(0.5, 1)
        this.battleCursor = new BattleCursor(this, this.cursorStartX, this.cursorStartY, 'cursor', 0).setOrigin(0.5, 1)

        this.enemy = new PennyEnemy(this, this.enemyStartX, this.enemyStartY, 'PennyMonster', 0).setOrigin(0.5)

    //UI:
        //names:
        this.gName = this.add.bitmapText(this.HPTextX, this.HPTextY, this.mainFont, 'MYBUTT', this.labelSize).setOrigin(0)
        this.aName = this.add.bitmapText(this.HPTextX, this.HPTextY+30, this.mainFont, 'ANAIS', this.labelSize).setOrigin(0)
        this.dName = this.add.bitmapText(this.HPTextX, this.HPTextY+60, this.mainFont, 'DARWIN', this.labelSize).setOrigin(0)
        this.gName.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        this.aName.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        this.dName.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        //health numbers:
        this.gHPText = this.add.bitmapText(this.HPTextX + 200, this.HPTextY+5, this.mainFont, this.gHP, 18).setOrigin(0)
        this.aHPText = this.add.bitmapText(this.HPTextX + 200, this.HPTextY+35, this.mainFont, this.aHP, 18).setOrigin(0)
        this.dHPText = this.add.bitmapText(this.HPTextX + 200, this.HPTextY+65, this.mainFont, this.dHP, 18).setOrigin(0)
        this.gHPText.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        this.aHPText.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        this.dHPText.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)


        this.eHPText = this.add.bitmapText(900, 80, this.mainFont, this.enemy.HP, 24).setOrigin(0)
        //this.eHPText.setTintFill(0xffd000, 0xffd000, 0xffe262, 0xffe262)
        
        this.charMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.charMenuBox.create('MAGIC', 'ITEM', 'SCIENCE')

        this.gMagicMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.gMagicMenuBox.create('ELEC 1', 'ENRG 1')

        this.aMagicMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.aMagicMenuBox.create('EXPLSN 1')

        this.aSciMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.aSciMenuBox.create('BLASTMIX', 'WEAKMIX')

        this.dMagicMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.dMagicMenuBox.create('HEAL 1')

        this.itemMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.itemMenuBox.create('BANANA', 'DVDPLR')
        //this.charMenuBox.create(this)
        //this.TestBox = new MenuBox(this, width/18, height/10, 'menuBox9Slice', 0, 500, 150, 5, 5, 5, 5).setOrigin(0)
        //this.TestBox = new MenuBox(this, width*0.8, height*0.8, 'combatMenuBox9Slice', 0, 150, 150, 5, 5, 13, 5)
    //Attack sprites:
        this.bananaPeelSprite = this.add.sprite(0, -500, 'bananaPeel')
       
        this.music = this.sound.add('battle')
        this.music.setLoop(true)
        this.music.play()
        
    }

    update() {
        this.gHPText.setText(this.gHP.toFixed(0))
        this.aHPText.setText(this.aHP.toFixed(0))
        this.dHPText.setText(this.dHP.toFixed(0))
        this.cursorFSM.step()
        this.pennyFSM.step()
        this.charMenuBox.update() //need to call the update method so it is run in this update method - update in the prefabs might not have any inherent definition?
        this.gMagicMenuBox.update()
        this.aSciMenuBox.update()
        this.dMagicMenuBox.update()
        this.itemMenuBox.update()
        //console.log(this.playerTurn)

        if (this.playerTurn == false && this.enemyTurn == false){
            this.enemyTurn = true
            this.enemyTurnFunc()
        }

        if (this.enemy.HP <= 0){
            this.music.stop()
            this.scene.start('victoryScene')
        }
        if (this.aHP <= 0 && this.gHP <=0 && this.dHP <= 0){
            this.music.stop()
            this.scene.start('loadScene')
        }
    }

    enemyTurnFunc(){
        let turnTime = 2000
        this.time.delayedCall(turnTime, () => {
            console.log("enemy turn over")
            this.playerTurn = true
            this.enemyTurn = false
        }, null, this)
    }

    gMagic1(){
        this.gMagic1Sprite = this.add.sprite(0, -500, 'gumballMagic1', 0).setOrigin(0.5, 0,5)
        this.gMagic1Sprite.x = width/2.3
        this.gMagic1Sprite.y = height*0.47
        this.gMagic1Sprite.play({key: 'gMagic1Start', frameRate: 9})
        this.gMagic1Sprite.on('animationcomplete', () => {
            console.log('gMagic1Loop playing')
            this.gMagic1Sprite.play({key: 'gMagic1Loop', frameRate: 9})
            this.gMagic1Sprite.on('animationcomplete', () => {
                console.log('destroying gMagic1Sprite')
                //this.gMagic1Sprite.x = -500
                //this.gMagic1Sprite.y = 0
                this.gMagic1Sprite.destroy()
            })
        })
        
        
        this.enemy.incomingDmgType = 2
        this.enemy.incomingDmg = (this.gMagic*8)
        //this.eHPText.setText(this.enemy.HP)
        console.log(this.enemy.HP)
        this.playerTurn = false
    }

    gMagic2(){
        this.gMagic2Sprite = this.add.sprite(0, -500, 'gumballMagic1', 0).setOrigin(0.5, 0,5)
        this.gMagic2Sprite.x = width/2.3
        this.gMagic2Sprite.y = height*0.47
        this.gMagic2Sprite.play({key: 'gMagic2', frameRate: 9})
        this.gMagic2Sprite.on('animationcomplete', () => {
            this.gMagic2Sprite.destroy()
        })
        
        
        this.enemy.incomingDmgType = 0
        this.enemy.incomingDmg = (this.gMagic*9)
        //this.eHPText.setText(this.enemy.HP)
        console.log(this.enemy.HP)
        this.playerTurn = false
    }

    aSci1(){
        this.enemy.incomingDmgType = 1
        this.enemy.incomingDmg = (this.aScience*8)
        //this.eHPText.setText(this.enemy.HP)
        console.log(this.enemy.HP)
        this.playerTurn = false
    }

    aSci2() {

    }

    dMagic1(){
        if (this.aHP < 500 && this.aHP > 0){
            this.aHP += (this.dMagic*4)
        }
        if (this.dHP < 500 && this.dHP > 0){
            this.dHP += (this.dMagic*4)
        }
        if (this.gHP < 500 && this.gHP > 0){
            this.gHP += (this.dMagic*4)
        }
        if (this.aHP > 500){
            this.aHP = 500
        }
        if (this.dHP > 500){
            this.dHP = 500
        }
        if (this.gHP > 500){
            this.gHP = 500
        }
        this.playerTurn = false
    }

    //dMagic2(){
        //this.enemy.incomingDmgType
    //}

    bananaPeel(){
        let randNum = Phaser.Math.Between(1, 1)
        if (randNum === 1){
            console.log('stunned!')
            this.enemy.stunned = true
        }
        this.playerTurn = false
    }
}