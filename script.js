const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
let startPauseBt = document.querySelector('#start-pause')
const musicaInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = document.querySelector('#musica')
let intervalo = null
let pauseSom = document.querySelector('#pause')
let startSom = document.querySelector('#play')
let beepFim = document.querySelector('#beep')

let tempoEmSegundos = 1500

musicaInput.addEventListener('change', function () {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

        case 'descanso-curto':

            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;

        case 'descanso-longo':

            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa</strong>`

            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoEmSegundos <= 0) {
        beepFim.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervalo) {
        zerar()
        pauseSom.play()
        return
    }
    intervalo = setInterval(contagemRegressiva, 1000)
    startSom.play()
    startPauseBt.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', '/imagens/pause.png');
    console.log(iniciarOuPausarImg)
}

function zerar() {
    clearInterval(intervalo)
    startPauseBt.textContent = 'Começar'
    iniciarOuPausarImg.setAttribute('src', '/imagens/play_arrow.png')
    console.log(iniciarOuPausarImg)
    intervalo = null
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()