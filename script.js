//Inicialização dos dados iniciais do jogo, com um objeto que representa as posições do tabuleiro
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
//Inicialização de variáveis importantes para o jogo
let player = '';
let warning = '';
let playing = false;
//Chamada da função reset para iniciar o jogo
reset();

//Adiciona evento de clique no botão de reset
document.querySelector('.reset').addEventListener('click', reset);
//Adiciona evento de clique em todos os itens do tabuleiro
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Função que é chamada quando um item do tabuleiro é clicado
function itemClick(event) {
    //Pega a posição do item clicado
    let item = event.target.getAttribute('data-item');
    //Verifica se é possível jogar naquela posição e, se sim, realiza a jogada
    if(playing && square[item] === '') {
        square[item] = player;
        //Atualiza o tabuleiro com a jogada realizada
        renderSquare();
        //Muda o jogador
        togglePlayer();
    }
}
//Função que reseta o jogo
function reset() {
    warning = '';
    //Escolhe aleatoriamente o jogador que vai iniciar a partida
    let random = Math.floor(Math.random() * 2);
    player = random === 0 ? 'x' : 'o';
    //Zera as posições do tabuleiro
    for(let i in square) {
        square[i] = '';
    }
    playing = true;
    //Atualiza o tabuleiro e as informações de jogo    
    renderSquare();
    renderInfo();
}
//Função que atualiza o tabuleiro
function renderSquare() {
    //Percorre as posições do tabuleiro e atualiza o HTML com os valores
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    //Verifica se houve vencedor ou empate
    checkGame();
}
//Função que atualiza as informações de jogo
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}
//Função que alterna entre os jogadores
function togglePlayer() {
    player = player === 'x' ? 'o' : 'x';
    renderInfo();
}
//Função que verifica se há vencedor ou empate
function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    }else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    }else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}
//Função que verifica se um determinado jogador venceu
function checkWinnerFor(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    // Cria uma matriz com todas as possibilidades de vencer o jogo
    for(let w in pos) { // Itera sobre a matriz pos
        // Divide cada posição por vírgulas
        let pArray = pos[w].split(',');
        // Verifica se o jogador passado como parâmetro (i) venceu o jogo
        let hasWon = pArray.every(option=>square[option] === i);
        // Se o jogador venceu, retorna verdadeiro e encerra a função
        if(hasWon) return true;
    }
    // Se não houve vencedor, retorna falso
    return false;
}
function isFull() {
    // Itera sobre o objeto square
    for(let i in square) {
        // Se alguma posição do objeto estiver vazia
        if(square[i] === '') {
            // Retorna falso, indicando que o jogo ainda não está completo
             return false;
        }
    }
    // Se todas as posições estiverem preenchidas, retorna verdadeiro, indicando que o jogo está completo
    return true;
};