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
        cursor.x = scene.cursorStartX
        cursor.y = scene.cursorStartY
    }
    
    execute(scene, cursor){
        //console.log("party state execute")
        //const { left, right, space } = scene.keys
        //console.log(cursor.pos)
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && cursor.charPos > 0) {
            console.log("left input")
            //console.log(this.x)
            cursor.x = cursor.x - scene.cursorMoveInterval
            cursor.charPos--
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && cursor.charPos < 2)   {
            cursor.x = cursor.x + scene.cursorMoveInterval
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
        cursor.x = scene.cursorMenuX
        cursor.y = scene.cursorMenuY
        cursor.texture = 'cursorMenu'
    }
}