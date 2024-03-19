class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    init(){
        this.vMult = 200
        this.partyFollowDelay = 500
    }

    preload(){
        this.load.image('tilesetImage', './assets/OverworldMap.png')
        this.load.tilemapTiledJSON('overworldJSON', './assets/ElmoreTileMap.json')
    }
    
    create() {
        //this.add.image(0, 0, 'tilesetImage')
        const map = this.add.tilemap(('overworldJSON'))
        const tileset = map.addTilesetImage('OverworldMap.png', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const collideLayer = map.createLayer('Obstacle', tileset, 0, 0)

        collideLayer.setCollisionByProperty({ collides: true})

        const gSpawn = map.findObject('Spawns', (obj) => obj.name ==='gSpawn')
        const aSpawn = map.findObject('Spawns', (obj) => obj.name ==='aSpawn')
        const dSpawn = map.findObject('Spawns', (obj) => obj.name ==='dSpawn')
        //console.log(gSpawn)
        this.leslieBattleXY = map.findObject('Battles', (obj) => obj.name === 'leslieBattle')
        if (leslieBeaten == 0) {
            this.leslieBattle = this.physics.add.sprite(this.leslieBattleXY.x, this.leslieBattleXY.y, 'leslieMonster', 0)
            this.leslieBattle.setDisplaySize(95, 90)
            this.leslieBattle.setImmovable()
        }

        this.pennyBattleXY = map.findObject('Battles', (obj) => obj.name === 'pennyBattle')
        this.pennyBattle = this.physics.add.sprite(this.pennyBattleXY.x, this.pennyBattleXY.y, 'pennyMonster', 0)
        this.pennyBattle.setDisplaySize(80, 100)
        this.pennyBattle.setImmovable()

        this.gumballMap = this.physics.add.sprite(gSpawn.x, gSpawn.y, 'gumballOverworld', 0)
        this.anaisMap = this.physics.add.sprite(aSpawn.x, aSpawn.y, 'anaisOverworld', 0)
        this.darwinMap = this.physics.add.sprite(dSpawn.x, dSpawn.y, 'darwinOverworld', 0)
        this.gumballMap.body.setCollideWorldBounds(true)
        this.anaisMap.body.setCollideWorldBounds(true)
        this.darwinMap.body.setCollideWorldBounds(true)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.gumballMap, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.gumballMap, collideLayer)
        this.physics.add.collider(this.anaisMap, collideLayer)
        this.physics.add.collider(this.darwinMap, collideLayer)

        this.physics.add.collider(this.gumballMap, this.leslieBattle, this.leslieBattleStart, null, this)
        this.physics.add.collider(this.gumballMap, this.pennyBattle, this.pennyBattleStart, null, this)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        this.partyDirection = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown){
            //console.log("left is down")
            this.direction.x = -1
            this.time.delayedCall(this.partyFollowDelay, () => {
                this.partyDirection.x = -1
            }, null, this)
        } else if (this.cursors.right.isDown){
            this.direction.x = 1
            this.time.delayedCall(this.partyFollowDelay, () => {
                this.partyDirection.x = 1
            }, null, this)
        }

        if(this.cursors.up.isDown){
            this.direction.y = -1
            this.time.delayedCall(this.partyFollowDelay, () => {
                this.partyDirection.y = -1
                //console.log(this.partyDirection.y)
            }, null, this)
        } else if (this.cursors.down.isDown){
            this.direction.y = 1
            this.time.delayedCall(this.partyFollowDelay, () => {
                this.partyDirection.y = 1
            }, null, this)
        }
        this.direction.normalize()
        
        //console.log(this.partyDirection)
        this.gumballMap.setVelocity(this.vMult * this.direction.x, this.vMult * this.direction.y)
        this.time.delayedCall(this.partyFollowDelay, () => {
            this.partyDirection.normalize()
            this.anaisMap.setVelocity(this.vMult * this.partyDirection.x, this.vMult * this.partyDirection.y)
            this.darwinMap.setVelocity(this.vMult * this.partyDirection.x, this.vMult * this.partyDirection.y)
        }, null, this)

        
    }

    leslieBattleStart(){
        console.log('touched leslieBattle')
        //visual transition?
        this.leslieBattle.destroy()
        this.scene.start('battleScene')
    }

    pennyBattleStart(){
        console.log('touhed pennyBattle')
        this.scene.start('pennyBattleScene')
    }
}