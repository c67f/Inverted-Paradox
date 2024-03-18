class BattleCursor extends Phaser.GameObjects.Sprite { //lexical declaration error because I forgot to capitalize Sprite
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.charPos = 2 //what character the cursor is over if in party member select state - 0 is Darwin, 1 is Anais, 2 is Gumball
        this.menuPos = 0 //what menu option the cursor is on, counting from top to bottom (that is, 0 is the topmost item, 1 would be the item below that, etc.)
        this.currentChar = 2 //what character's menus you are in - same numbers as charPos

        //intitialize finite state machine
        scene.cursorFSM = new StateMachine('party', {
            enemyTurn: new EnemyTurnState(),
            party: new PartyState(),
            charBattle: new CharBattleState(),
            //gumballAtks: new GumballAtksState(),
            //anaisAtks: new AnaisAtksState(),
            //darwinAtks: new DarwinAtksState(),
            gumballMg: new GumballMagicState(),
            //anaisMg: new AnaisMagicState(),
            anaisSci: new AnaisSciState(),
            darwinMg: new DarwinMagicState(),
            itemsBattle: new ItemsBattleState
        }, [scene, this])

    }
    
    
}

class PartyState extends State{
    enter(scene, cursor){
        console.log("party state enter")
        scene.charMenuBox.x = -500
        scene.charMenuBox.y = 0
        scene.gMagicMenuBox.x = -500
        scene.gMagicMenuBox.y = 0
        scene.itemMenuBox.x = -500
        scene.itemMenuBox.y = 0
        cursor.setFrame(0)
        cursor.x = scene.cursorStartX - ((2 - cursor.charPos) * scene.cursorPartyMoveInterval)
        cursor.y = scene.cursorStartY
    }
    
    execute(scene, cursor){
        //console.log("party state execute")
        //const { left, right, space } = scene.keys
        //console.log(cursor.pos)
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && cursor.charPos > 0) {
            console.log("left input")
            //console.log(this.x)
            cursor.x = cursor.x - scene.cursorPartyMoveInterval
            cursor.charPos--
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && cursor.charPos < 2)   {
            cursor.x = cursor.x + scene.cursorPartyMoveInterval
            cursor.charPos++
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (!(cursor.charPos === 0 && scene.dHP <= 0) && !(cursor.charPos === 1 && scene.aHP <=0) && !(cursor.charPos === 2 && scene.gHP <=0)){
                cursor.currentChar = cursor.charPos
                this.stateMachine.transition('charBattle')
                return
            }
        }
    }
}

class CharBattleState extends State {
    enter(scene, cursor){
        console.log("CharBattleState enter")
        scene.gMagicMenuBox.x = -500
        scene.gMagicMenuBox.y = 0
        scene.aSciMenuBox.x = -500
        scene.aSciMenuBox.y = 0
        scene.dMagicMenuBox.x = -500
        scene.dMagicMenuBox.y = 0
        scene.itemMenuBox.x = -500
        scene.itemMenuBox.y = 0

        scene.charMenuBox.x = scene.charMenuX
        scene.charMenuBox.y = scene.charMenuY
        cursor.x = scene.cursorMenuX
        cursor.y = scene.cursorMenuY
        //console.log(cursor.depth)
        //console.log((scene.charMenuBox).depth)
        cursor.setDepth(scene.charMenuBox.displayHeight+1)
        //console.log(cursor.texture)
        //cursor.texture = 'cursorMenu'
        cursor.menuPos = 1
        //console.log(this.menuPos)
        cursor.setFrame(1)
    }
    
    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyUP) && cursor.menuPos > 0){
            console.log("up input")
            cursor.y = cursor.y - scene.cursorMenuMoveInterval
            cursor.menuPos--
            //console.log(cursor.menu)
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && cursor.menuPos < 2){
            console.log("down input")
            cursor.y = cursor.y + scene.cursorMenuMoveInterval
            cursor.menuPos++
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            if (cursor.menuPos == 1){
                this.stateMachine.transition('itemsBattle')
            } else if (cursor.currentChar == 2) {
                console.log("gumballMg select")
                if (cursor.menuPos == 1){
                    this.stateMachine.transition('gumballMg')
                }
                
            } else if(cursor.currentChar == 1){
                //console.log('anaisSci select')
                if (cursor.menuPos == 2){
                    this.stateMachine.transition('anaisSci')
                }
            }else if(cursor.currentChar == 0){
                if (cursor.menuPos == 1){
                    this.stateMachine.transition('darwinMg')
                }
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('party')
        }
    }
}

class GumballMagicState extends State {
    enter(scene, cursor) {
        console.log("GumballMagicState enter")
        scene.gMagicMenuBox.x = scene.charMenuX+50
        scene.gMagicMenuBox.y = scene.charMenuY+50
        cursor.x = scene.cursorMenuX+50
        cursor.y = scene.cursorMenuY+50
        cursor.menuPos = 1
    }

    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyUP) && cursor.menuPos > 0){
            console.log("up input")
            cursor.y = cursor.y - scene.cursorMenuMoveInterval
            cursor.menuPos--
            //console.log(cursor.menu)
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && cursor.menuPos < scene.gMagicNum){
            console.log("down input")
            cursor.y = cursor.y + scene.cursorMenuMoveInterval
            cursor.menuPos++
        }
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('charBattle')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(cursor.menuPos) {
                case 1:
                    console.log("gMagic1")
                    //scene.enemy.incomingDmgType = 2 //0 is typeless, 1 is fire, 2 is electricity, 3 is water
                    scene.gMagic1()
                    this.stateMachine.transition('enemyTurn')
                    break
                case 2:
                    console.log('gMagic2')
                    scene.gMagic2()
                    this.stateMachine.transition('enemyTurn')
                    break
            }    
        }

    }    
}

class AnaisSciState extends State {
    enter(scene, cursor) {
        console.log("AnaisSciState enter")
        scene.aSciMenuBox.x = scene.charMenuX+50
        scene.aSciMenuBox.y = scene.charMenuY+50
        cursor.x = scene.cursorMenuX+50
        cursor.y = scene.cursorMenuY+50
        cursor.menuPos = 0
    }

    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyUP) && cursor.menuPos > 0){
            console.log("up input")
            cursor.y = cursor.y - scene.cursorMenuMoveInterval
            cursor.menuPos--
            //console.log(cursor.menu)
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && cursor.menuPos < scene.gMagicNum){
            console.log("down input")
            cursor.y = cursor.y + scene.cursorMenuMoveInterval
            cursor.menuPos++
        }
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('charBattle')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(cursor.menuPos) {
                case 0:
                    console.log("aSci1")
                    //enemy.incomingDmgType
                    scene.aSci1()
                    this.stateMachine.transition('enemyTurn')
                    break
            }    
        }

    }    
}

class DarwinMagicState extends State {
    enter(scene, cursor) {
        console.log("GumballMagicState enter")
        scene.dMagicMenuBox.x = scene.charMenuX+50
        scene.dMagicMenuBox.y = scene.charMenuY+50
        cursor.x = scene.cursorMenuX+50
        cursor.y = scene.cursorMenuY+50
        cursor.menuPos = 0
    }

    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyUP) && cursor.menuPos > 0){
            console.log("up input")
            cursor.y = cursor.y - scene.cursorMenuMoveInterval
            cursor.menuPos--
            //console.log(cursor.menu)
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && cursor.menuPos < scene.gMagicNum){
            console.log("down input")
            cursor.y = cursor.y + scene.cursorMenuMoveInterval
            cursor.menuPos++
        }
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('charBattle')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(cursor.menuPos) {
                case 0:
                    console.log("dMagic1")
                    scene.dMagic1()
                    this.stateMachine.transition('enemyTurn')
                    break
            }    
        }

    }    
}

class EnemyTurnState extends State {
    enter(scene, cursor) {
        console.log("EnemyTurnState enter")
        scene.charMenuBox.x = -500
        scene.charMenuBox.y = 0
        scene.gMagicMenuBox.x = -500
        scene.gMagicMenuBox.y = 0
        scene.aSciMenuBox.x = -500
        scene.aSciMenuBox.y = 0
        scene.dMagicMenuBox.x = -500
        scene.dMagicMenuBox.y = 0
        scene.itemMenuBox.x = -500
        scene.itemMenuBox.y = 0
        cursor.x = -500
        cursor.y = 0
    }
    
    execute(scene, cursor){
        if(scene.playerTurn == true){
            this.stateMachine.transition('party')
        }
    }
}

class ItemsBattleState extends State {
    enter(scene, cursor){
        console.log("ItemsBattleState enter")
        scene.itemMenuBox.x = scene.charMenuX + 50
        scene.itemMenuBox.y = scene.charMenuY+50
        cursor.x = scene.cursorMenuX+50
        cursor.y = scene.cursorMenuY+50
        cursor.menuPos = 0
    }

    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('charBattle')
        } else if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(cursor.menuPos) {
                case 0:
                    console.log("bananaPeel")
                    scene.bananaPeel()
                    this.stateMachine.transition('enemyTurn')
                    break
            }    
        }
    }
}