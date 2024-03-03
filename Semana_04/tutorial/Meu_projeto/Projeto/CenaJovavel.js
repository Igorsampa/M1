    //Declarei as variáveis globais
    var mago;
    var teclado;
    var inimigo;
    var pontuacao = 0;
    var botaoC;
    var placar;
    var barreira
    var projetil;
    var ultimoBotaoApertado = null;
    var atirando = false;
    var hitbox;
   
    //Aqui estão as funções com a animação dos personagens

    function movimentoLados() {
      mago.anims.play("movimentoLados", true);
    }

   function movimentoParado() {
      mago.anims.play("movimentoParado", true);
    }
   
   function movimentoAtirando() {
      mago.anims.play("movimentoAtirando", true);
    }
    function movimentoInimigo() {
      inimigo.anims.play("movimentoInimigo", true);
      barreira.body.x = barreira.x -30
    }

// Defini uma nova classe chamada CenaJogavel que estende a classe Phaser.Scene
export default class CenaJogavel extends Phaser.Scene {
  constructor() {
      super({ key: 'CenaJogavel' }); // Chamei o construtor da classe pai e defini a chave da cena como 'CenaJogavel'

    ;
  }

   //Pré-carregamos das imagens/sprites
    preload() {
      this.load.image("backGround", "assets/bg_1.png");
      this.load.spritesheet("mago", "assets/mago_1.png", {
        frameWidth: 500,
        frameWidth: 500,
      });
      this.load.spritesheet("magoAtirando", "assets/mago_1_atirando.png", {
        frameWidth: 500,
        frameWidth: 500,
      });
      this.load.spritesheet("projetil", "assets/projetil_1.png", {
        frameWidth: 129,
        frameWidth: 193,
      });
      this.load.spritesheet("inimigo", "assets/inimigo_1_1.png", {
        frameWidth: 500,
        frameWidth: 500,
      });
      this.load.spritesheet("barreira", "assets/Barreira.png", { 
      frameWidth: 10,
      frameWidth: 360,
      });
    }
   //Adição das imagens/sprites e de algumas configurações
    create() {
      this.add.image(325, 330, "backGround").setScale(0.7);
      mago = this.physics.add.sprite(200, 600, "mago").setScale(0.15);
      mago.setCollideWorldBounds(true);
      mago.body.setSize(420, 700, true);
      
      barreira = this.physics.add.staticSprite(620, 580, "barreira").setScale(0.2, 0.4).refreshBody()
   
      this.anims.create({
        key: "movimentoInimigo",
        frames: this.anims.generateFrameNumbers("inimigo", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
   
      this.anims.create({
        key: "projetil_1",
        frames: this.anims.generateFrameNumbers("projetil_1", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1,
      });
   
      this.anims.create({
        key: "movimentoLados",
        frames: this.anims.generateFrameNumbers("mago", { start: 8, end: 10 }),
        frameRate: 10,
        repeat: -1,
      });
   
      this.anims.create({
        key: "movimentoParado",
        frames: this.anims.generateFrameNumbers("mago", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1,
      });
   
      this.anims.create({
        key: "movimentoAtirando",
        frames: this.anims.generateFrameNumbers("magoAtirando", {
          start: 8,
          end: 11,
        }),
        frameRate: 10,
        repeat: 0,
      });
   
      inimigo = this.physics.add.sprite(10, 600, "inimigo").setScale(0.15).refreshBody()
      //adição do platar com a pontuação
      placar = this.add.text(50, 50, "Pontuação: " + pontuacao, {
        fontSize: "45px",
        fill: " #FFFFFF",
      });
      //Conlisão do mago com a barreira
      this.physics.world.collide(mago, barreira)
      teclado = this.input.keyboard.createCursorKeys();
      botaoC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
   
    update() {
      // Lógica para movimentação do personagem, além disso, guarda a informação do último botão apertado
      if (teclado.left.isDown && !atirando) {
          ultimoBotaoApertado = "esquerda";
          mago.setVelocityX(-150);
          movimentoLados();
          mago.setFlip(true, false);
      } else if (teclado.left.isDown) {
          movimentoAtirando();
          mago.setVelocityX(-150);
          mago.setFlip(true, false);
      } else if (teclado.right.isDown && !atirando) {
          ultimoBotaoApertado = "direita";
          movimentoLados();
          mago.setVelocityX(150);
          mago.setFlip(false, false);

      } else if (teclado.right.isDown) {
          movimentoAtirando();
          mago.setVelocityX(150);
          mago.setFlip(false, false);
      } else {
          mago.setVelocityX(0);
          if (atirando === false) {
              movimentoParado();
          }
      }
      //Configurações para que o personagem somente atire caso ele não esteja atirando
      if (botaoC.isDown && !atirando) {
          var velocidadeTiro = 400;
          //Configurações para caso o último botão apertado for o "esqueda" e o mago está parado, inverter o lado do tiro
          if (ultimoBotaoApertado === "esquerda" && mago.anims.currentAnim.key === "movimentoParado") {
              velocidadeTiro *= -1;
          } 
          //Outra configuração para arrumar o lado do tiro do mago
          if (mago.body.velocity.x < 0) {
              velocidadeTiro *= -1;
          }
          movimentoAtirando();
          //Configurações do tiro/projétil do 
          projetil = this.physics.add.sprite(mago.x, mago.y, "projetil").setScale(0.6);
          hitbox = projetil.body.setSize(80, 50, true);
          projetil.setVelocityX(velocidadeTiro);
          atirando = true;
          if (ultimoBotaoApertado === "esquerda") {
              projetil.setFlip(true, false);
              velocidadeTiro *= -1;
          }
          if (ultimoBotaoApertado === "direita") {
              projetil.setFlip(false, false);
              velocidadeTiro *= -1;
          }
      }
        //Distância do projétil para o mago poder atirar de novo
      if (projetil) {
          if (projetil.x > mago.x + 300 || projetil.x < mago.x - 300) {
              projetil.destroy();
              atirando = false;
          }
      }
      //Movimentação do inimigo
      if (inimigo.x >= 10) {
          inimigo.setVelocityX(100);
          movimentoInimigo();
          //Aqui colocamos o sistema de sobreposição entre o inimigo e o projétil, adicionamos "velocidade" para  a barreira, também a destruição do projétil e as configurações do placar, isso o inimigo estando entre 0 e 300 no x
          this.physics.add.overlap(inimigo, projetil, function() {
              barreira.x -= 5;
              if (inimigo.x > 0 && inimigo.x < 300) {
                  var posicaoInimigo_X = Phaser.Math.RND.between(1, 10);
                  inimigo.setPosition(posicaoInimigo_X, 600);
                  inimigo.setVelocityX(inimigo.body.velocity.x * 10);
                  projetil.destroy();
                  atirando = false;
                  pontuacao += 1;
                  inimigo.setFlip(false, false);
                  placar.setText("Pontuação: " + pontuacao);
                  //Aqui fazemos a mesma coisa, mas o inimigo estará entre 300 e 700 no x
              } else if (inimigo.x >= 300 && inimigo.x < 700) {
                  inimigo.setVelocityX(inimigo.body.velocity.x * -1);
                  var posicaoInimigo_X = Phaser.Math.RND.between(600, 610);
                  inimigo.setPosition(posicaoInimigo_X, 600);
                  inimigo.setVelocityX(inimigo.body.velocity.x * 1.02);
                  projetil.destroy();
                  atirando = false;
                  inimigo.setFlip(true, false);
                  pontuacao += 1;
              }
          })
          //Colisão entre o mago e a barreira
          this.physics.world.collide(mago, barreira);
      }
      //Configuração do inimigo após ele ser acertado
      if (inimigo.x > 610) {
          var posicaoInimigo_X = Phaser.Math.RND.between(1, 10);
          inimigo.setPosition(posicaoInimigo_X, 600);
          inimigo.setFlip(false, false);
      }
      //Configuração para que o jogo recomesse caso o mago encoste no inimigo
      this.physics.add.overlap(mago, inimigo, function() {
          this.scene.start('NovaCena');
          pontuacao = 0;
          //O null, this foi utilizado para que seja possível possa acessar corretamente a cena atual e executar as tarefas necessárias de maneira certa durante o jogo.
      }, null, this);
  }
}