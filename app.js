
let listaDeNumerosSorteio = [];
let definirNumeroSecretoJogo = 0
let numeroSecreto;
let tentativas = 1;

  exibirMensagemInicial ();

function exibirMensagemInicial () {
   exibirTextoNaTela('h1', 'Jogo do Número Maluco!');
   if (definirNumeroSecretoJogo === 0) {
     exibirTextoNaTela ('p', 'Digite na caixa abaixo o valor MÁXIMO para o sorteio:');
   } else {
     exibirTextoNaTela('p', `Selecione um número entre 1 e ${definirNumeroSecretoJogo}`);
   }
}

function exibirTextoNaTela (tag, texto) {
 let textoExibido = document.querySelector(tag);
 textoExibido.innerHTML = texto;
}

function verificarChute() {
        let valorDigitado = parseInt(document.querySelector('input').value);
         if (definirNumeroSecretoJogo === 0)  {
        definirNumeroSecretoJogo = valorDigitado;
        numeroSecreto = gerarNumeroSecreto ();
        
        exibirTextoNaTela('p', `Selecione um número entre 1 e ${definirNumeroSecretoJogo}`);
        document.querySelector('input').value = '';

        return
     }

        let chute = valorDigitado; 
                                                           
     if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou, parabéns');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p', mensagemTentativas);

        document.getElementById ('reiniciar').removeAttribute ('disabled');
        document.getElementById('limite').removeAttribute('disabled'); ////ATIVAR BOTÃO DE ALTERAR LIMITE

    } else if (chute > numeroSecreto) {
        exibirTextoNaTela ('p', 'Mona, o número é menor e tal, ajeita isso aí');
    } else {
        exibirTextoNaTela ('p', 'Mona, o número é maior e tal, ajeita isso');
    }
    tentativas++;
    document.querySelector('input').value = '';
}    

function gerarNumeroSecreto () {
   let numeroEscolhido = parseInt(Math.random() *definirNumeroSecretoJogo + 1);
   if (listaDeNumerosSorteio.includes (numeroEscolhido)) {
    return gerarNumeroSecreto ();
   } else {
    listaDeNumerosSorteio.push (numeroEscolhido);
    console.log (listaDeNumerosSorteio)
    return numeroEscolhido;
   }
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroSecreto ();
    document.querySelector('input').value = '';
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById ('reiniciar').setAttribute ('disabled', true); 

}
function alterarLimite() {
    definirNumeroSecretoJogo = 0; 
    listaDeNumerosSorteio = []; 
    reiniciarJogo(); 

}

document.querySelector('input').addEventListener('keypress', function(evento) {

    if (evento.key === 'Enter') {
      
        verificarChute();
    }
});
