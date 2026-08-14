const cartoesGuess = document.querySelectorAll('.guess-card')
const mensagemFinal = document.querySelector('.guess-final')

let acertosTotal = 0

cartoesGuess.forEach((cartao) => {
    const opcoes = cartao.querySelectorAll('.guess-option')

    opcoes.forEach((opcao) => {
        opcao.addEventListener('click', () => {

            // Evita clicar de novo depois de já ter acertado
            if (cartao.classList.contains('revealed')) return

            const acertou = opcao.dataset.correct === 'true'

            if (acertou) {
                opcao.classList.add('correct')
                opcoes.forEach((o) => (o.disabled = true))

                setTimeout(() => {
                    cartao.classList.add('revealed')
                    acertosTotal++

                    if (acertosTotal === cartoesGuess.length) {
                        setTimeout(() => {
                            mensagemFinal.classList.add('show')
                        }, 400)
                    }
                }, 500)

            } else {
                opcao.classList.add('wrong')
                setTimeout(() => opcao.classList.remove('wrong'), 400)
            }
        })
    })
})