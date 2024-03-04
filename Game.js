// definição de variáveis
var plataforms;
var player;
var cursors;
var cifs;
var placar;
var pontuacao = 0;
//cria classe
class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('fundo', 'assets/btg.png'); // add  arquivo do fundo
        this.load.image('grama', 'assets/grama-sheet.png'); // add o arquivo da grama
        this.load.spritesheet('sallu', 'assets/salluter.png', { frameWidth: 1000, frameHeight: 1000 });  // add o arquivo do sallu e defini como uma spritsheet
        this.load.image('cif', 'assets/cif.png')// add arquivo cifrão
        this.load.image('card', 'assets/card.png') // add arquivo card

    }

    create() {
        
        
        this.add.image(600, 300, 'fundo'); //add o fundo na tela
        
        plataforms = this.physics.add.staticGroup(); // agrega a variável um carater estático

        plataforms.create(400, 568, 'grama').setScale(0.5).refreshBody();// add a grama como uma coisa estática

        plataforms.create(650, 450, 'card').setScale(0.3).refreshBody();// add a grama como uma coisa estática

        player = this.physics.add.sprite(100, 200, 'sallu').setScale(0.3); // agrega ao sallu um corpo físico dinâmico

        player.setBounce(0.2); // defini o fator de ressalto
        player.setCollideWorldBounds(true) // para ele somente ficar no mapa 
        this.physics.add.collider(player, plataforms); // não colidir com as 

        player.body.setSize(400, 900, true); // alterar hitbox do sallu

        // add as moneys pra coletar
        cifs = this.physics.add.group();
        cifs.create(900, 460, 'cif').setScale(3)
        cifs.create(600, 300, 'cif').setScale(3)
        cifs.create(400, 460, 'cif').setScale(3)
        this.physics.add.collider(cifs, plataforms);

        cifs.children.iterate((cifs) => {
            cifs.body.setSize(20, 20, true);
        });
        //add o placar
        placar = this.add.text(850, 30, 'moneys:0/3', { fontSize: '30px', fill: '#000000' })

        this.physics.add.overlap(player, cifs.getChildren(), function (player, cif) {
            cif.disableBody(true, true); // Desativa a física e esconde o cif
            pontuacao += 1; // Incrementa a pontuação
            placar.setText('moneys:' + pontuacao + '/3'); // Atualiza o texto do placar
        });


        // cria a animação de andar para a esquerda
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('sallu', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        // cria a animação do sallu parado
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('sallu', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        // cria a animação de andar para a direita
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('sallu', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });


        // up pra direita
        this.anims.create({
            key: 'up.right',
            frames: this.anims.generateFrameNumbers('sallu', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: 0
        });


        cursors = this.input.keyboard.createCursorKeys(); // agrega a variável um gerenciador de inputs do teclado
        player.anims.play('idle', true);


    }

    update() {

        if ((player.body.touching.down && !player.anims.isPlaying) || (player.anims.currentAnim.key === 'idle')) {

            player.flipX = false
            if (cursors.up.isDown && cursors.right.isDown) {
                player.anims.play('up.right');
                player.setVelocity(200, -400);
            }

            else if (cursors.up.isDown && cursors.left.isDown) {
                player.anims.play('up.right');
                player.flipX = true
                player.setVelocity(-200, -400);
            }

            // defini o que cada tecla faz
            else if (cursors.left.isDown) {
                player.setVelocityX(-200);
                player.flipX = true
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                player.setVelocityX(200);
                console.log("foi")
                player.anims.play('right', true);
            }

            else if (cursors.up.isDown && player.body.touching.down) {
                player.anims.play('up');
                player.setVelocity(0, -400);
            }

            else {
                player.setVelocityX(0);
                player.anims.play('idle', true);
            }

        }

        if (pontuacao === 3) {
            this.scene.stop();
            this.scene.start('telaFinal');
            pontuacao = 0
        }

    }
     }