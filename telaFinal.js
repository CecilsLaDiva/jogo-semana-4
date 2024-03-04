


class telaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'telaFinal' });
    }

    preload() {
        this.load.image('final', 'assets/final.png')
        this.load.image('dnv', 'assets/recomecar.png')
    }
    
    create() {
        this.add.image(600, 300, 'final').setScale(5)
        const botao = this.add.image(600, 200, 'dnv').setScale(3)
        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('telaInicial');
        })
    };
}