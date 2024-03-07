class Battle extends Phaser.Scene {
    constructor() {
        super("battleScene")
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

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)

        //placeholder
        this.itemsNum = 0
        //gumballAtkNum = 1
        this.gMagicNum = 1
        //anaisAtkNum = 1
        this.aMagicNum = 0
        this.aSciNum = 1
        //darwinAtkNum = 1
        this.dMagicNum = 1

        //Combat stats:
        this.gHP = 500
        this.gMagic = 8
        this.gScience = 2
        
        this.aHP = 500
        this.aMagic = 5
        this.aScience = 15
        
        this.dHP = 500
        this.dMagic = 10
        this.dScience = 3
        
        //Enemy vars:
        this.eHP = 1200

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

    //UI:
        //names:
        this.add.bitmapText(this.HPTextX, this.HPTextY, this.mainFont, 'MYBUTT', this.labelSize).setOrigin(0)
        this.add.bitmapText(this.HPTextX, this.HPTextY+30, this.mainFont, 'ANAIS', this.labelSize).setOrigin(0)
        this.add.bitmapText(this.HPTextX, this.HPTextY+60, this.mainFont, 'DARWIN', this.labelSize).setOrigin(0)
        //health numbers:
        this.gHPText = this.add.bitmapText(this.HPTextX + 300, this.HPTextY, this.mainFont, this.gHP, 18).setOrigin(0)



        this.eHPText = this.add.bitmapText(900, 200, this.mainFont, this.eHP, 18).setOrigin(0)

        
        this.charMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        this.charMenuBox.create('MAGIC', 'ITEM', 'SCIENCE')
        this.gMagicMenuBox = new MenuBox(this, -500, 0, 'menuBox9Slice', 0, 180, 150, 5, 5, 5, 5).setOrigin(0)
        //this.charMenuBox.create(this)
        //this.TestBox = new MenuBox(this, width/18, height/10, 'menuBox9Slice', 0, 500, 150, 5, 5, 5, 5).setOrigin(0)
        //this.TestBox = new MenuBox(this, width*0.8, height*0.8, 'combatMenuBox9Slice', 0, 150, 150, 5, 5, 13, 5)
       

        
    }

    update() {
        this.cursorFSM.step()
        this.charMenuBox.update() //need to call the update method so it is run in this update method - update in the prefabs might not have any inherent definition?
        this.gMagicMenuBox.update()
        console.log(this.playerTurn)

        if (this.playerTurn == false && this.enemyTurn == false){
            this.enemyTurn = true
            this.enemyTurnFunc()
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
        this.eHP -= (this.gMagic*2)
        this.eHPText.setText(this.eHP)
        console.log(this.eHP)
        this.playerTurn = false
    }
}