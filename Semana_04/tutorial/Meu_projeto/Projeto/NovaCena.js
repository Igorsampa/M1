// Importa a classe Phaser.Scene para criar uma nova cena
export default class NovaCena extends Phaser.Scene {
    constructor() {
        super({ key: 'NovaCena' }); // Chama o construtor da classe pai e define a chave da cena
    }

    // Método para carregar os recursos necessários para a cena
    preload() {
        this.load.image("floresta", "assets/floresta.jpg"); 

    }

    // Método para configurar os elementos da cena
    create() {
        // Adiciona a imagem da floresta na posição especificada e ajusta sua escala
        this.add.image(320, 330, "floresta").setScale(0.157, 0.13);
        
        // Adiciona um botão para iniciar a próxima cena
        var botaoProximaCena = this.add.text(210, 300, 'INICIAR', { fontSize: '64px', fill: '#ffffff' });
        botaoProximaCena.setInteractive(); // Torna o botão interativo para que possa ser clicado
        botaoProximaCena.on('pointerdown', () => {
            this.scene.start('CenaJogavel'); // Inicia a próxima cena quando o botão é clicado
        });
    }

    
    update() {
        
    }
}


