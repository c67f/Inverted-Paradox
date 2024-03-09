class LeslieEnemy extends Phaser.GameObjects.Sprite { //lexical declaration error because I forgot to capitalize Sprite
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.attacked = false
        this.leafDelayInterval = 400

        console.log('Leslie monster created')
        this.HP = 1500
        this.atk = 10
        this.dmg = 0

        this.leafAtkBase = 2.5
        this.vineAtkBase = 3
        
        this.randNum = -1
        this.dmgRandMod = -1
        this.lastAtk = 1 // 0 is leafAtk, 1 is vineAtk

        scene.leslieFSM = new StateMachine('offTurn', {
            offTurn: new offTurnState(),
            atkDecide: new atkDecideState(),
            leafAtk: new leafAtkState(),
            vineAtk: new vineAtkState()
            //grappleAtk: new grappleAtkState()
        }, [scene, this])

    }
}

class offTurnState extends State {
    enter(scene, leslie) {
        console.log("offTurnState enter")
        leslie.setFrame(0)
    }

    execute(scene, leslie) {
        if (scene.enemyTurn === true){
            this.stateMachine.transition('atkDecide')
        }
    }
}

class atkDecideState extends State {
    enter(scene, leslie) {
        console.log("atkDecideState enter")
        leslie.randNum = Phaser.Math.Between(1, 10)
    }

    execute(scene, leslie) {
        if (leslie.lastAtk === 0){  //if the previous attack was the single target, high damage, leaf attack, there's a lower chance of it happening for a second time in a row
            console.log('last attack was leaf')
            if (leslie.randNum <= 2){
                this.stateMachine.transition('leafAtk')
            } else {
                this.stateMachine.transition('vineAtk')
            }
        } else {
            console.log('last attack was not leaf')
            if (leslie.randNum <= 5){
                this.stateMachine.transition('leafAtk')
            } else {
                this.stateMachine.transition('vineAtk')
            }
        }
    }
}

class leafAtkState extends State{
    enter (scene, leslie) {
        leslie.lastAtk = 0
        console.log("leafAtkState enter")
        leslie.attacked = false
        leslie.dmgRandMod = Phaser.Math.FloatBetween(0.8, 1.2)
    }
    
    execute(scene, leslie) {
        if (leslie.attacked === false){
            leslie.randNum = Phaser.Math.Between(0, 2) //determine target
            switch(leslie.randNum){
                case 0:
                    console.log("targeting Darwin")
                    leslie.dmg = leslie.atk * leslie.dmgRandMod * leslie.leafAtkBase
                
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.gHP = scene.gHP - leslie.dmg
                    }, null, this)
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.gHP = scene.gHP - leslie.dmg
                    }, null, this)
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.gHP = scene.gHP - leslie.dmg
                    }, null, this)

                    leslie.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                case 1:
                    console.log("targeting Anais")
                    leslie.dmg = leslie.atk * leslie.dmgRandMod * leslie.leafAtkBase
                    
                    scene.aHP = scene.aHP - leslie.dmg
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.aHP = scene.aHP - leslie.dmg
                    }, null, this)
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.aHP = scene.aHP - leslie.dmg
                    }, null, this)
                    console.log(scene.aHP)

                    leslie.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                case 2:
                    console.log("targeting Gumball")
                    leslie.dmg = leslie.atk * leslie.dmgRandMod * leslie.leafAtkBase
                    
                    scene.dHP = scene.dHP - leslie.dmg
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.dHP = scene.dHP - leslie.dmg
                    }, null, this)
                    scene.time.delayedCall(leslie.leafDelayInterval, () => {
                        scene.dHP = scene.dHP - leslie.dmg
                    }, null, this)

                    leslie.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                    
            }
        }
    }
}

class vineAtkState extends State{
    enter (scene, leslie) {
        leslie.lastAtk = 1
        console.log("vineAtkState enter")
        leslie.attacked = false
        leslie.dmgRandMod = Phaser.Math.FloatBetween(0.8, 1.2)
    }
    
    execute(scene, leslie) {
        //leslie.randNum = Phaser.Math.Between(0, 2) //determine target
        leslie.dmg = leslie.atk * leslie.dmgRandMod * leslie.vineAtkBase
        if (leslie.attacked === false) {
            console.log("vine attack damage:")
            console.log(leslie.dmg)
            scene.gHP = scene.gHP - leslie.dmg
            scene.aHP = scene.aHP - leslie.dmg
            scene.dHP = scene.dHP - leslie.dmg
            leslie.attacked = true
            scene.time.delayedCall(2000, () => {
                this.stateMachine.transition('offTurn')
            }, null, this)
        }
    }
}