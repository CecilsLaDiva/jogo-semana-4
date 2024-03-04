

class telaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    preload() {
        this.load.image('cena', 'assets/ceupng.png')
        this.load.image('play', 'assets/play.png')
        this.load.image('seta', 'assets/setas.png')
    }

    create() {
        this.add.image(600, 300, 'cena').setScale(0.65);
        this.add.image(900, 500, 'seta').setScale(0.65);
        const botao = this.add.image(600, 400, 'play').setScale(0.4);
        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('Game');
        })
    };
}