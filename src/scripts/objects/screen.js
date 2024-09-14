const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? "O usuário não possui nome cadastrado 😥"}</h1>
                                <p>${user.bio ?? "O usuário não possui bio cadastrada 😥"}</p>
                                <p class="divider"></p>
                                <div class="follow">
                                    <p>👥 Seguindo:<span>${user.following}</span></p>
                                    <p>🏃🏽‍♂️ Seguidores:<span>${user.followers}</span></p>
                                </div>
                            </div>
                        </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <div class="icons">
                                                                            <p>🍴 ${repo.forks ?? "Sem forks"}</p>
                                                                            <p>⭐ ${repo.stargazers_count ?? "Sem estrelas"}</p>
                                                                            <p>👀 ${repo.watchers ?? "Sem visualizações"}</p>
                                                                            <p>👩‍💻 ${repo.language ?? "Sem linguagem"}</p>
                                                                        </div>
                                                                    </a>
                                                                </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventItems = ""
        user.events.forEach(element => {
            if (element.type ==="PushEvent"){
                eventItems += `<li>
                                 <h3>${element.repo.name}</h3>
                                 <p> -- ${element.payload.commits[0].message}</p>
                               </li>`
            }else{
                eventItems += `<li>
                                 <h3>${element.repo.name}</h3>
                                 <p> -- Criado um ${element.payload.ref_type}</p>
                               </li>`
            }
            })

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventItems}</ul>
                                           </div>`
        }else{
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <p>Esse usuário não possui eventos públicos 🤡</p>
                                           </div>`
        }
    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }