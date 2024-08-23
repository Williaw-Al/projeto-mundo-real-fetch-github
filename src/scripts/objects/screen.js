const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? "O usuário não possui nome cadastrado 😥"}</h1>
                                <p>${user.bio ?? "O usuário não possui bio cadastrada 😥"}</p>
                                <p>👥 Seguindo ${user.following}</p>
                                <p>🏃🏽‍♂️ Seguidores ${user.followers}</p>
                            </div>
                        </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <div class="icons">
                                                                            <p>🍴 ${repo.forks}</p>
                                                                            <p>⭐ ${repo.stargazers_count}</p>
                                                                            <p>👀 ${repo.watchers}</p>
                                                                            <p>👩‍💻 ${repo.language}</p>
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
        user.events.forEach(event  => {
            if(event.type === "PushEvent"){
                eventItems += `<li><a href="${event.repo.url}" target="_blank">${event.repo.name} ${event.payload.commits[0].message}</a></li>`
                
            }else if(event.type === "CreateEvent"){
                eventItems += `<li><a href="${event.repo.url}" target="_blank">${event.repo.name} create</a></li>`
            }})

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Eventos</h2>
                                                <ul>${eventItems}</ul>
                                           </div>`
        }

    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }