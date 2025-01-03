let listaDeNumerosSorteados = [];
let numeroLimite = 80;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensageminicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementoNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementoNaLista == numeroLimite)
    {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.8});
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Isso aí, você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}!`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}!`);
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensageminicial() {
    exibirTextoNaTela('h1', 'O jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 20');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensageminicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}