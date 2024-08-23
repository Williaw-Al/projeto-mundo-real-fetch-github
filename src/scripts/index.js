import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

const btnSearch = document.getElementById("btn-search")
const userInputSearch = document.getElementById("input-search")

userInputSearch.addEventListener("keyup", (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

btnSearch.addEventListener("click", () => {
    const userName = userInputSearch.value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com um nome de usuário do GitHub")
        return true
    }
}

async function getUserData(userName){

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
    
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    console.log(await user)
    screen.renderUser(user)

}