var config = {
    type: Phaser.AUTO, // defini o tipo de renderização
    width: 1200, // largura da tela do game
    height: 600, // altura da tela do game
    // ?? não sei exlpicar
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },

    //defini as funções executadas no game
    scene: [telaInicial, Game, telaFinal]
}


var game = new Phaser.Game(config); // defini a variável game e "guarda" nela as configurações que colocamos no config
var platforms; // variável para identificar o chão
var player; // variável para identifcar o boneco
var cursors; // variável para identificar o teclado


