class MenuBox extends Phaser.GameObjects.NineSlice {
    constructor(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight){
        super(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight)

        scene.add.existing(this)
    }
}