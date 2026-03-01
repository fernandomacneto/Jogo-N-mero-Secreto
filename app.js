// A gente puxa o function e cria qual vai ser a função, no caso, exibir um texto.
// colocamos (tag, texto) e aí quando = document.querySelector () ele já sabe que é sobre o h1
// embaixo a variavel.innerHTML = texto, ele já sabe que é sobre o paragrafo.
// quando eventualmente puxarmos essa função só precisa botar oq quer mostrar (tag ou texto) e colocar oq quer.
let listaDeNumerosSorteio = [];
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1

  exibirMensagemInicial ();

function exibirTextoNaTela (tag, texto) {
     let textoExibido = document.querySelector(tag);
     textoExibido.innerHTML = texto;
     responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
     {rate: 1.2});
}

function exibirMensagemInicial () {
   exibirTextoNaTela('h1', 'Jogo do Número Maluco!');
   exibirTextoNaTela('p', 'Tente adivinhar um número entre 1 e 10');
}


// na linha 27 do HTML tem essa opção <button onclick="verificarChute()" class="container__botao">Chutar</button>
// Esse verificarChute() eu que adicionei para criar uma função no botão "Chutar".
function verificarChute() {                                 
    let chute = document.querySelector('input').value;     
                                                           
     if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou, parabéns');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p', mensagemTentativas);


        // aqui vamos puxar o ID do button da linha 27 do HTML para poder deixar o botão reiniciar ligado.
        document.getElementById ('reiniciar').removeAttribute ('disabled');


    } else if (chute > numeroSecreto) {
        exibirTextoNaTela ('p', 'Mona, o número é menor e tal, ajeita isso aí');
    } else {
        exibirTextoNaTela ('p', 'Mona, o número é maior e tal, ajeita isso');
    }
    tentativas++;
    document.querySelector('input').value = '';
}    // essa opção no input é pra apagar os numeros quando chutar. fizeram de outro jeito na alura, 
//  mas assim funciona também.



// aqui usamos o function para gerar um numero aleatorio como no outro projeto.
// estrutura similar, porém colocando o return para que esse numero apareça realmente apareça
function gerarNumeroSecreto () {
   let numeroEscolhido = parseInt(Math.random() *10 + 1);
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
    verificarChute();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById ('reiniciar').setAttribute ('disabled', true); 
}