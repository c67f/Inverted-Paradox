class MenuBox extends Phaser.GameObjects.NineSlice {
    constructor(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight){
        super(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight)

        scene.add.existing(this)
        //console.log("scene:")
        //console.log(scene)
        this.text1 = this.scene.add.bitmapText(this.x + 40, this.y + 20, this.scene.mainFont, 'test', this.scene.labelSize)
        this.text2 = this.scene.add.bitmapText(this.x + 40, this.y + 20 + this.scene.labelSize, this.scene.mainFont, 'test2', this.scene.labelSize)
        this.text3 = this.scene.add.bitmapText(this.x + 40, this.y + 20 + 2*this.scene.labelSize, this.scene.mainFont, 'test3', this.scene.labelSize)
        
        this.text1.setTintFill(0x9fa4a1, 0x9fa4a1, 0xf7ffff, 0xf7ffff)
        this.text2.setTintFill(0x9fa4a1, 0x9fa4a1, 0xf7ffff, 0xf7ffff)
        this.text3.setTintFill(0x9fa4a1, 0x9fa4a1, 0xf7ffff, 0xf7ffff)
        
        /*this.text1.tintTopLeft = "#f7ffff"
        this.text1.tintTopRight = "#f7ffff"
        this.text1.tintBottomLeft= "#f7ffff"
        this.text1.tintBottomRight= "#f7ffff"

        this.text2.tintTopLeft= "#f7ffff"
        this.text2.tintTopRight= "#f7ffff"
        this.text2.tintBottomLeft= "#f7ffff"
        this.text2.tintBottomRight= "#f7ffff"

        this.text3.tintTopLeft= "#f7ffff"
        this.text3.tintTopRight= "#f7ffff"
        this.text3.tintBottomLeft= "#f7ffff"
        this.text3.tintBottomRight= "#f7ffff"*/
    }

    create(text1, text2, text3) {
        console.log("MenuBox created")
        console.log(this.x)
        //console.log(this.scene)
        this.text1.setText(text1)
        this.text2.setText(text2)
        this.text3.setText(text3) 
        
    }

    update() {
        //console.log("scene: ")
        //console.log(this.scene)
        //console.log(this.x)
        this.text1.x = this.x + 50
        this.text1.y = this.y + 20
        this.text2.x = this.x + 50
        this.text2.y = this.y + 20 + this.scene.labelSize
        this.text3.x = this.x + 50
        this.text3.y = this.y + 20 + 2*this.scene.labelSize
    }
}