import Phaser from '../lib/phaser.js'

class SchimitarWeapon  {


//------------------Schimitar animation--------------------------
		this.anims.create({
    		key: 'left',
    		frames: [ { key: 'schimitar', frame: 2 } ],
    		frameRate: 20
		});
		this.anims.create({
    		key: 'right',
    		frames: [ { key: 'schimitar', frame: 3 } ],
    		frameRate: 20
		});
//-------------------------------------------------------------
}