const themeToggle = document.querySelector('#theme-toggle')
const html = document.documentElement

const temaSalvo = localStorage.getItem('tema')
const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches

if (temaSalvo === 'dark' || (!temaSalvo && prefereEscuro)) {
    html.setAttribute('data-theme', 'dark')
}

themeToggle?.addEventListener('click', () => {
    const ativarEscuro = html.getAttribute('data-theme') !== 'dark'

    if (ativarEscuro) {
        html.setAttribute('data-theme', 'dark')
    } else {
        html.removeAttribute('data-theme')
    }

    localStorage.setItem('tema', ativarEscuro ? 'dark' : 'light')
})