class BattleCursor extends Phaser.GameObjects.Sprite { //lexical declaration error because I forgot to capitalize Sprite
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.charPos = 2 //what character the cursor is over if in party member select state - 0 is Darwin, 1 is Anais, 2 is Gumball
        this.menuPos = 0 //what menu option the cursor is on, counting from top to bottom (that is, 0 is the topmost item, 1 would be the item below that, etc.)
        this.currentChar = 2 //what character's menus you are in - same numbers as charPos

        //intitialize finite state machine
        scene.cursorFSM = new StateMachine('party', {
            party: new PartyState(),
            charBattle: new CharBattleState()/*,
            gumballAtks: new GumballAtksState(),
            anaisAtks: new AnaisAtksState(),
            darwinAtks: new DarwinAtksState(),
            gumballMg: new GumballMagicState(),
            anaisMg: new AnaisMagicState(),
            darwinMG: new DarwinMagicState(),
            itemsBattle: new ItemsBattleState*/
        }, [scene, this])

    }

    
}

class PartyState extends State{
    enter(scene, cursor){
        console.log("party state enter")
        scene.charMenuBox.x = -500
        scene.charMenuBox.y = 0
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
            this.stateMachine.transition('charBattle')
            return
        }
    }
}

class CharBattleState extends State {
    enter(scene, cursor){
        console.log("CharBattleState enter")
        scene.charMenuBox.x = scene.charMenuX
        scene.charMenuBox.y = scene.charMenuY
        cursor.x = scene.cursorMenuX
        cursor.y = scene.cursorMenuY
        console.log(cursor.depth)
        console.log((scene.charMenuBox).depth)
        cursor.setDepth(scene.charMenuBox.displayHeight+1)
        //console.log(cursor.texture)
        //cursor.texture = 'cursorMenu'
        cursor.setFrame(1)
    }
    
    execute(scene, cursor){
        if(Phaser.Input.Keyboard.JustDown(keyUP) && cursor.menuPos > 0){
            console.log("up input")
            cursor.y = cursor.y - scene.cursorMenuMoveInterval
            cursor.menuPos--
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && cursor.menuPos < 2){
            console.log("down input")
            cursor.y = cursor.y + scene.cursorMenuMoveInterval
            cursor.menuPos++
        }
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            this.stateMachine.transition('party')
        }
    }
}