//import player-sprites from '../assets/characterSheet.png'
export default function makeAnimations(scene) {
    // TONS of animations. Everything animation-related is ugly and stupid below.
    // TODO:  maybe use JSON to load animations
    
    let config = {
        key: 'platform',
        frames: scene.anims.generateFrameNumbers('platforms', {
            start: 14,
            end: 14,
            first: 14
        })
    };

    scene.anims.create(config);
    //---------------Player Animation------------------------------
    config = {
        key: 'PlatformTile',
        frames: scene.anims.generateFrameNumbers('tiles', {
            start: 14,
            end: 14,
            first: 14
        })
    };
        scene.anims.create(config);   
        config = {
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player-sprite', {
                start: 1,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        };

        scene.anims.create(config);
        config = {
            key: 'turn',
            frames: [{
                key: 'player-sprite',
                frame: 0
            }],
            frameRate: 20
        };

        scene.anims.create(config);
        config = {
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player-sprite', {
                start: 4,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        };

        scene.anims.create({
            key: 'clingleft',
            frames: [{
                key: 'player-sprite',
                frame: 10
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'clingright',
            frames: [{
                key: 'player-sprite',
                frame: 11
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'turn',
            frames: [{
                key: 'player-sprite',
                frame: 0
            }],
            frameRate: 20
        });
}
