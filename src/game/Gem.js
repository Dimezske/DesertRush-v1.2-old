import Phaser from '../lib/phaser.js'

export default class Gem extends Phaser.Physics.Arcade.Sprite
{
	/**
	 * @param {Phaser.Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {string} texture 
	 */
	constructor(scene, x, y, texture = 'gem')
	{
		super(scene, x, y, texture)

		this.setScale(1)
	}
}
