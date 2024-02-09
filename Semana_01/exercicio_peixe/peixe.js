var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;
var mexer;

function preload() {
    this.load.image('mar', 'assets/bg_azul-claro.png');

    this.load.image('peixe', 'assets/peixes/Peixe listra.png');

    this.load.image('logo', 'assets/logo-inteli_branco.png')

    this.load.image('alga', 'assets/alga.png')

    this.load.image('viva', 'assets/viva.png')
}

function create() {
    this.add.image(400, 300, 'mar');

    this.add.image(100, 475, 'alga').setScale(0.5)

    this.add.image(400, 525, 'logo').setScale(0.5);

    viva = this.add.image(300, 300, 'viva').setScale(0.3).setFlip(true,false)

   peixinho = this.add.image(400, 300, 'peixe').setOrigin(0.5, 0,5).setFlip(true,false);

   peixinho.setFlip(true, false);
}
function update() {
    var movimento = peixinho.x
    peixinho.x = this.input.x;
    peixinho.y = this.input.y;
    
    
//Aqui eu coloquei para o peixe virar de acordo com o movimento do mouse,
if (peixinho.x < movimento) {
    peixinho.setFlip(true, false)
    
}
else if (peixinho.x > movimento)
 peixinho.setFlip(false, false)

//Aqui eu coloquei para a água-viva se mexer na tela, em forma de um loop
var velocidade = 3
viva.x += velocidade;


if (viva.x > 900) {
    viva.x = -100
}

}
