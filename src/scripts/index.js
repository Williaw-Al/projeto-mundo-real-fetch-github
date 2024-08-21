import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

const btnSearch = document.getElementById("btn-search")
const userNameInput = document.getElementById("input-search")

userNameInput.addEventListener("keyup", (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

btnSearch.addEventListener("click", () => {
    const userName = userNameInput.value
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

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    console.log(user);
    screen.renderUser(user)

}
