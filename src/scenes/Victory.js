class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene")
    }

    create() {
        this.add.sprite(0, 0, 'victory').setOrigin(0)
    }
}