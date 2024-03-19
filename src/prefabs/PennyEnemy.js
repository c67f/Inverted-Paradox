class PennyEnemy extends Phaser.GameObjects.Sprite { //lexical declaration error because I forgot to capitalize Sprite
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.attacked = false
        //this.leafDelayInterval = 400
        this.stunned = false
        this.stunCounter = 0
        this.statusTimer = -1
        this.statusTimerMax = 0

        console.log('Penny monster created')
        this.HP = 2500
        this.atk = 15
        this.dmg = 0

        this.zapAtkBase = 4
        this.chargeAtkBase = 9
        
        this.randNum = -1
        this.dmgRandMod = -1
        this.dmgMod = 1
        this.lastAtk = 1 // 0 is zapAtk, 1 is chargeAtk, 2 is charging
        this.charged = 0

        this.incomingDmg
        this.incomingDmgType = 0

        scene.pennyFSM = new StateMachine('offTurn', {
            offTurn: new offTurnStateP(),
            atkDecide: new atkDecideStateP(),
            zapAtk: new zapAtkState(),
            chargeAtk: new chargeAtkState(),
            charging: new chargingState(),
            stunned: new stunnedStateP()
            //grappleAtk: new grappleAtkState()
        }, [scene, this])

    }
}

class offTurnStateP extends State {
    enter(scene, penny) {
        if (penny.statusTimer > -1){
            penny.statusTimer++
            if (penny.statusTimer >= penny.statusTimerMax){
                penny.dmgMod = 1
                penny.statusTimer == -1
            }
        }
        console.log("offTurnState enter")
        penny.setFrame(0)
    }

    execute(scene, penny) {
        if (scene.enemyTurn === true && penny.stunned === false){
            this.stateMachine.transition('atkDecide')
        } else if (scene.enemyTurn === true && penny.stunned === true){
            this.stateMachine.transition('stunned')
        }
    }
}

class stunnedStateP extends State {
    enter(scene, penny) {
        if (penny.stunCounter === 0){
            scene.bananaPeelSprite.x = 800
            scene.bananaPeelSprite.y = 600
        }
        console.log("stunnedState enter")
        penny.attacked = false
        penny.stunCounter++
        if (penny.stunCounter > 1){
            penny.stunned = false
            penny.stunCounter = 0
            scene.bananaPeelSprite.x = -500
            scene.bananaPeelSprite.y = 0
        }
    }

    execute(scene, penny){
        if (penny.attacked === false){
            penny.attacked = true
            scene.time.delayedCall(2000, () => {
                this.stateMachine.transition('offTurn')
            }, null, this)
        }
    }
}

class atkDecideStateP extends State {
    enter(scene, penny) {
        console.log("atkDecideState enter")
        penny.randNum = Phaser.Math.Between(1, 10)
        //Elemental weakness(es):
        if (penny.incomingDmgType == 2){ //weak to electricity
            penny.HP -= penny.incomingDmg * 2
            scene.eHPText.setText(penny.HP)
        } else {
            penny.HP -= penny.incomingDmg
            scene.eHPText.setText(penny.HP)
        }
    }

    execute(scene, penny) {
        if (penny.charged === 1){
            this.stateMachine.transition('chargeAtk')
        } else if (penny.lastAtk === 0){  //if the previous attack was the charge attack it won't happen again in a row
            console.log('last attack was charge attack')
            this.stateMachine.transition('zapAtk')
        } else {
            console.log('last attack was not charge')
            if (penny.charged === 0 && (penny.randNum <= 1 || (penny.HP < 2500*0.4 && penny.randNum <= 5))){
                this.stateMachine.transition('charging') //10% chance to be the charge attack, unless health is below 40%, in which case 50% chance to use it
            } else {
                this.stateMachine.transition('zapAtk')
            }
        }
    }
}
//Zap: single target attack
class zapAtkState extends State{
    enter (scene, penny) {
        penny.lastAtk = 0
        console.log("zapAtkState enter")
        penny.attacked = false
        penny.dmgRandMod = Phaser.Math.FloatBetween(0.8, 1.2)
        penny.setFrame(1)
    }
    
    execute(scene, penny) {
        if (penny.attacked === false){
            penny.randNum = Phaser.Math.Between(0, 2) //determine target
            let zapAtkSprite = scene.add.sprite(width/2.8, 400, 'zapAtkSprite').setOrigin(0, 0.5)
            zapAtkSprite.setDisplaySize(160, 160)
            switch(penny.randNum){
                case 0:
                    console.log("targeting Darwin")

                    zapAtkSprite.x = width/8
                    zapAtkSprite.play({key: 'zapAtk', frameRate: 12})
                    zapAtkSprite.on('animationcomplete', () => {
                        console.log('zapAtk playing')
                        zapAtkSprite.destroy()
                    })

                    penny.dmg = penny.atk * penny.dmgRandMod * penny.dmgMod * penny.zapAtkBase
                    scene.gHP = scene.gHP - penny.dmg
                    console.log(scene.gHP)

                    penny.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                case 1:
                    console.log("targeting Anais")

                    zapAtkSprite.x = width/4.3
                    zapAtkSprite.play({key: 'zapAtk', frameRate: 7})
                    zapAtkSprite.on('animationcomplete', () => {
                        console.log('zapAtk playing')
                        zapAtkSprite.destroy()
                    })

                    penny.dmg = penny.atk * penny.dmgRandMod * penny.dmgMod * penny.zapAtkBase
                    scene.aHP = scene.aHP - penny.dmg
                    console.log(scene.aHP)

                    penny.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                case 2:
                    console.log("targeting Gumball")

                    zapAtkSprite.x = width/2.8
                    zapAtkSprite.play({key: 'zapAtk', frameRate: 7})
                    zapAtkSprite.on('animationcomplete', () => {
                        console.log('zapAtk playing')
                        zapAtkSprite.destroy()
                    })

                    penny.dmg = penny.atk * penny.dmgRandMod * penny.dmgMod * penny.zapAtkBase
                    scene.dHP = scene.dHP - penny.dmg
                    console.log(scene.dHP)

                    penny.attacked = true
                    scene.time.delayedCall(2000, () => {
                        this.stateMachine.transition('offTurn')
                    }, null, this)
                    break
                    
            }
        }
    }
}

class chargingState extends State{
    enter(scene, penny) {
        penny.lastAtk = 2
        console.log("chargingState enter")
        penny.attacked = false
        penny.setFrame(2)
    }

    execute(scene, penny) {
        if (penny.attacked === false){
            penny.charged = 1
            penny.attacked = true
            scene.time.delayedCall(2000, () => {
                this.stateMachine.transition('offTurn')
            }, null, this)
        }
    }
}


class chargeAtkState extends State{
    enter (scene, penny) {
        penny.lastAtk = 1
        console.log("chargeAtkState enter")
        penny.attacked = false
        penny.dmgRandMod = Phaser.Math.FloatBetween(0.8, 1.2)
        penny.setFrame(1)
    }
    
    execute(scene, penny) {
        //penny.randNum = Phaser.Math.Between(0, 2) //determine target

        if (penny.attacked === false) {
            penny.dmg = penny.atk * penny.dmgRandMod * penny.dmgMod * penny.chargeAtkBase
            console.log("vine attack damage:")
            console.log(penny.dmg)
            scene.gHP = scene.gHP - penny.dmg
            scene.aHP = scene.aHP - penny.dmg
            scene.dHP = scene.dHP - penny.dmg
            penny.charged = 0
            penny.attacked = true
            scene.time.delayedCall(2000, () => {
                this.stateMachine.transition('offTurn')
            }, null, this)
        }
    }
}