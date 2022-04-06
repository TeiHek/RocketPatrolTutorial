const { Phaser } = require("../../lib/phaser");

// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object into existing scene
        scene.add.existing(this);   // Add to existing, displayList, updateList
        this.isFiring = false;      // Track rocket's firing status
        this.moveSpeed = 2;         // Pixels per frame
    }

    update() {
        // L/R Movement
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // Firing
        if (Phaser.Input.Keyboard.JustDown(KeyF)) {
            this.isFiring = true;
        }
        // If fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // Reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this,y = game.config.height - borderUISize - borderPadding;
        }
    }
}