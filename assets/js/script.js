
 

// Retorna a cor certa para a tecnologia, ou uma cor padrão se não encontrar
function getCorTag(nome) {
    const chave = nome.toLowerCase().trim()
    return coresTecnologia[chave] || '#8b5cf6'
}
// Selecionar a Seção about
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper")

//Função para construir a seção about
async function getAboutGithub() {
    try {

        const resposta = await fetch('https://api.github.com/users/Dev-Everly')

        const perfil = await resposta.json()

        about.innerHTML = ''

        about.innerHTML = `

          <!-- Imagem da seção About -->
            <figure class="about-image">
                <img 
                 src="${perfil.avatar_url}"
                 alt= "${perfil.name}"
                >
            </figure>

            <!-- Conteúdo da seção About -->
            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>
                 Desenvolvedora Java Full Stack recém-graduada em Análise e Desenvolvimento de Sistemas. Atualmente, estou consolidando minha transição de carreira através do bootcamp intensivo da Generation Brasil (patrocinado pela Cummins), onde desenvolvo projetos práticos aplicando as melhores práticas de desenvolvimento de software.
                Tecnologias & Ferramentas: Java | POO | Spring Boot | SQL | AI | HTML5 | CSS3 | Scrum
                Minha trajetória no setor comercial me dá uma visão estratégica de negócios, excelente comunicação interpessoal, facilidade para trabalhar em equipe e forte gestão de tempo.
                Estou em busca da minha primeira oportunidade para atuar como Desenvolvedora Java / Full Stack Júnior ou Trainee.
                </p>

                <!-- Links (GitHub, Currículo e Dados do GitHub) -->
                <div class="about-buttons-data">

                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <!-- Dados - Repositório GitHub -->
                    <div class="data-container">

                        <!-- Número de seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Número de repositórios -->
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>

                    </div>

                </div>

            </article>

        `

    } catch (error) {
        console.error("Erro ao buscar dados no GitHub", error)
    }
}

//Função para construção do carrossel com o Swipper
async function getProjectsGitHub() {
    try {

       const resposta = await fetch('https://api.github.com/users/Dev-Everly/repos?sort=update&per_page=6')

        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach((repositorio) => {

            //Seleciona o nome da linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub'

            //Seleciona o ícone da linguagem padrão
            const icone = linguagens[linguagem] ?? linguagens['GitHub']

            //Construir o link do ícone
            const urlIcone = `./assets/icons/languages/${icone}.svg`

            // Formata o Nome do Repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
                .toUpperCase() // Converte a string em letras maiúsculas

            // Função para truncar texto
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub'

            // tags
            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`

            //Cria o botao Deploy
            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>
            `

            // Constrói o Card
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">

                        <!-- Ícone da Tecnologia padrão do projeto -->
                        <figure class="project-image">
                            <img src="${urlIcone}"
                                 alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                            >
                        </figure>

                        <!-- Conteúdo do Projeto -->
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>

                            <!-- Tags do Projeto -->
                            <div class="project-tags">
                                ${tags}
                            </div>

                            ${botoesAcao}
                        </div>

                    </article>
                </div>
            `
        })

        iniciarSwiper()


    } catch (error) {
        console.error("Erro ao buscar os dados dos projetos no GitHub", error)
    }
}

// Função para inicializar o carrossel do Swiper
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    })
}

getAboutGithub();
getProjectsGitHub();
