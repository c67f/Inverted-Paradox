class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene")
    }

    create() {
        this.add.sprite(0, 0, 'victory').setOrigin(0)
        scene.time.delayedCall(2000, () => {
            this.scene.start('overworldScene')
        }, null, this)
    }
}