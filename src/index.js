import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import backgroundImg from './assets/desert-background.png';
import groundSandBrokenImg from './assets/ground_sand_broken.png';
import groundSandBrokenWall from './assets/ground_sand_broken_wall.png'
import playerSpriteSheet from './assets/characterSheet.png';
//import Platforms from '../src/game/Platforms'
import Platforms from '../src/game/platform'
import GameOver from './scenes/GameOver'
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';

import jumpAudio from './assets/sfx/jump.wav';
import powerupAudio from './assets/sfx/powerup.wav';
import deadAudio from './assets/sfx/playerdied.mp3';
import clingAudio from './assets/sfx/cling.wav';

import palmTree from './assets/Palmtree.png';
import Animations from './helpers/animations';

class Player extends Phaser.Physics.Arcade.Sprite{
        //super(scene, x, y, 'player-sprite', 0);
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, 'player-sprite', 0);
            this.scene.add.existing(this);
            this.scene = scene;
            this.scene.physics.world.enable(this);
            //this.setImmovable(false);
            this.setScale(0.5);
            this.setCollideWorldBounds(true);
            //this.scene.cameras.main.startFollow(this);
            this.setVisible(true);
            this.keys = {
                    //up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
                    //left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
                    //right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
                    duck: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
                    attack: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                    clingOn: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                    clingOff: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            };    
    }
    __ani_setup(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player-sprite', {start: 0, end: 0 }),
            frameRate: 15
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 1, end: 3 }),
             frameRate: 10
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 4, end: 6 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 0, end: 0 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'duck-left',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 7, end: 7 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'duck',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 8, end: 8 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'duck-right',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 9, end: 9 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'cling-left',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 10, end: 10 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'cling-right',
            frames: this.anims.generateFrameNumbers('player-sprite', { start: 11, end: 11 }),
            frameRate: 10,
        });
    }
    control_handler(){
        
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.anims.play('left', true);
        } 
        if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);
            this.anims.play('right', true);
        }
        else if (this.cursors.down.isDown) {
            this.body.setVelocityX(0);
           
            this.anims.play('duck');
        }
        else if (this.cursors.up.isDown && this.body.touching.down){
            this.scene.sound.play('jump')
                this.body.setVelocityY(-330);
        }
        if (this.cursors.down.isDown && this.cursors.left.isDown){
            this.body.setVelocityX(-80);

            this.anims.play('duck-left', true);
        }
        if (this.cursors.down.isDown && this.cursors.right.isDown){
            this.body.setVelocityX(80);
            this.anims.play('duck-right', true);
        }
        else {
             
        }
        //----------------Clinging Cliff Hang------------------------------
        if(this.keys['clingOn'].isDown ) {
			console.log('is clinging')
			this.body.setAcceleration(0,0)	
	    }
	    if(this.keys['clingOff'].isDown)	{	
			console.log('is not clinging')
			this.body.setAcceleration(0,0)	
	    }
		if(this.keys['clingOn'].isDown && this.body.touching.left) {
            this.isClinging = true
            this.body.setVelocityY(0,0),
            this.body.setVelocityX(0,0),
            this.anims.play('cling-left');
            if (this.isClinging) {
                this.anims.play('cling-left',false);
            }
        }
        if(this.keys['clingOn'].isDown && this.body.touching.right) {
            this.isClinging = true
            this.body.setVelocityY(0,0),
            this.body.setVelocityX(0,0),
            this.anims.play('cling-right');
            if (this.isClinging){
                this.anims.play('cling-right',false);
            }
        }
        //----------------ClimbUp-------------------------
        /*
        if(this.keys['clingOn'].isDown && this.scene.physics.overlap(this, this.platforms)) {
            this.body.setAcceleration(0,0)
        }
        cliffHang() {
            if (this.keys['clingOn'].isDown && this.body.touching.left && this.keys['jump'].isDown) {
                this.sound.play('cling')
                        if(this.keys['jump'].isDown) {
                        climbUp();
                    }
            }
            else if (this.keys['clingOn'].isDown && this.body.touching.right && this.keys['jump'].isDown) {
                this.sound.play('cling')
                    this.body.setVelocityY(-50)
                    if(this.keys['jump'].isDown) {
                        climbUp();
                    }
            }
            else if (this.keys['clingOff'].isDown) {
    
            }*/
    }   
}
class GameScene extends Phaser.Scene
{
    constructor(scene) {
        super({
            key: 'GameScene'
        });
    } 
	init() {

	}
    preload() {
        this.load.image('background', backgroundImg);
        this.load.image('logo', logoImg);
        this.load.image('platform', groundSandBrokenImg);
        this.load.image('platform_wall', groundSandBrokenWall);
        this.load.audio('jump', jumpAudio);
        this.load.spritesheet('player-sprite', playerSpriteSheet, {
            frameWidth: 60,
            frameHeight: 80
        });
        this.load.image('palmtree',palmTree);

        this.load.json('version', '/src/leveldata/version.json');
       //this.load.json("mapLevel", '/leveldata/mapData.json');
        this.load.json("mapData", '/src/leveldata/mapData.json');
          
    }

    create (data) {
        const background = this.add.image(1450/2, 775/2, 'background');
		background.setScale(Math.max(1450 / background.width, 775 / background.height))
        .setScrollFactor(1, 0);
        //--------------Platform data---------------------------------
        this.platforms = this.physics.add.staticGroup();
        this.platformWalls = this.physics.add.staticGroup();
        for (let i = 0; i < 5; ++i)
		{
			const x = Phaser.Math.Between(80, 400)
			const y = 150 * i
	
			/** @type {Phaser.Physics.Arcade.Sprite} */
			const platform = this.platforms.create(x, y, 'platform')
			platform.scale = 0.5
	
			/** @type {Phaser.Physics.Arcade.StaticBody} */
			const body = platform.body
			body.updateFromGameObject()
		}
       this.mapData = function(level) {
            this.level = level;
        }
        mapLevel = new mapData(this.platforms[0]);
        mapLevel.level;
        for (const pdata of this.mapData.platforms) {
            const x = (pdata.position.xMax - pdata.position.xMin) * Math.random() + pdata.position.xMin;
            const y = (pdata.position.yMax - pdata.position.yMin) * Math.random() + pdata.position.yMin;
            const platform = this.platforms.create(x, y, 'platform')
            platform.scale = 0.5
            const body = platform.body
            body.updateFromGameObject()
          }
        //-------------collisions-------------------------------------------
        //player = this.physics.add.sprite(100, 100, 'player');
        this.player = this.physics.add.existing(new Player(this, 100, 100, 'player-sprite', 0));
        this.player.cursors = this.input.keyboard.createCursorKeys()
        
		this.player.body.checkCollision.up = true
		this.player.body.checkCollision.left = true
		this.player.body.checkCollision.right = true
		this.player.body.checkCollision.down = true
        this.player.body.setBounce(0.2);
        this.player.setScale(0.7)
        this.physics.add.collider(this.platforms, this.player)
        this.physics.add.collider(this.platformWalls, this.player)
        
        this.player.body.setCollideWorldBounds(false);

        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setDeadzone(this.scale.width * 1.5)
        
        
        //-------------------------------------------------------------------
    }
	update(time, delta) {
        this.player.body.setVelocityX(0)
        this.player.__ani_setup()
        this.player.control_handler()
        const menubuttons = this.input.keyboard.addKeys({
            'startbutton': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'exitbutton': Phaser.Input.Keyboard.KeyCodes.ESC
           });
           //------------cliffhanging------------------------

            if(menubuttons['startbutton'].isDown ) {
                console.log('start button!')
                //this.scene.stop('BootScene');
                this.scene.start('TitleScene');
            }
            else if(menubuttons['exitbutton'].isDown)	{	
                console.log('exit button!')	
            }
	}
	render() {

	}
}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1450,
	height: 775,
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        GameOver
    ],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: true
		}
	}
};

const game = new Phaser.Game(config);