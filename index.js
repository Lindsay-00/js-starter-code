// write JS code here

// current user
let user = {
    id: 2,
    name: "Lindsay",
    username: "NoyuLa",
    password: "Mementomori"
}
// navbar
function classToggle() {
    const navs = document.querySelectorAll('.Navbar__Items')
    
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  }
  
  document.querySelector('.Navbar__Link-toggle')
    .addEventListener('click', classToggle);



const animeDiv = document.querySelector('.page2')
const signContainer = document.querySelector('.container')
const homeDiv = document.querySelector('.page1')
const laterDiv = document.querySelector('.page3')
const navbarDiv = document.querySelector('.Navbar')

  navbarDiv.addEventListener('click', (event) => {
    if(event.target.matches('#anime')){
        signContainer.style.display = 'none'
        laterDiv.style.display = 'none'
        homeDiv.style.display = 'none'
        animeDiv.style.display = 'block'
    }
    else if(event.target.matches('#later')){
        signContainer.style.display = 'none'
        animeDiv.style.display = 'none'
        homeDiv.style.display = 'none'
        showList()
        laterDiv.style.display = 'block'
    }
    else if(event.target.matches('#sign')){
        animeDiv.style.display = 'none'
        laterDiv.style.display = 'none'
        homeDiv.style.display = 'none'
        signContainer.style.display = 'block'
    }
    else if(event.target.matches('#home')){
        animeDiv.style.display = 'none'
        laterDiv.style.display = 'none'
        signContainer.style.display = 'none'
        homeDiv.style.display = 'block'
    }
  })

// sign up

const signForm = document.querySelector(".sign-up-form")

  signForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let form = event.target
    let name = form.name.value
    let username = form.username.value
    let password = form.password.value
  
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
    //   mode: 'no-cors',
      headers:{
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        // render(response)
        console.log(response)
        user = response
        event.target.reset()
      })
  })

// new anime 
const newAnimeBtn = document.querySelector('#new-anime-btn')
const animeContainer = document.querySelector('.new-anime-container')
const animeForm = document.querySelector('.new-anime-form')
newAnimeBtn.addEventListener('click', () => {
    if (animeContainer.style.display === 'none') {
      animeContainer.style.display = 'block'
    } else {
      animeContainer.style.display = 'none'
    }
  })

  animeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let form = event.target
    let name = form.name.value
    let img_url = form.img_url.value
    let description = form.description.value
    let author = form.author.value
  
    fetch(`http://localhost:3000/animes`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        img_url: img_url,
        description: description,
        author: author,
      }),
    //   mode: 'no-cors',
      headers:{
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        render(response)
        event.target.reset()
      })
  })

// render all anime

fetch("http://localhost:3000/animes")
    .then(res => res.json())
    .then((allAnimes) => {
        console.log(allAnimes);
        allAnimes.forEach(render)
    })

const animeCollection = document.querySelector('#anime-collection')

function render(anime){
const divFlipcard = document.createElement('div')
divFlipcard.className = 'flip-card'
const divInner = document.createElement('div')
divInner.className = 'flip-card-inner'
const divFront = document.createElement('div')
divFront.className = 'flip-card-front'
const img = document.createElement('img')
img.src = anime.img_url
img.alt = anime.name
img.className = "anime-avatar"
const pRating = document.createElement('h4')
pRating.innerText = "Rating: 5"
const divBack = document.createElement('div')
divBack.className = 'flip-card-back'
divBack.innerHTML = `
<h2>${anime.name}</h2>
<p>Author: ${anime.author}</p>
<p>${anime.description}</p>
<button class="watch-later-btn" data-id="${anime.id}">Watch Later</button>
<button class="view-comments" data-id="${anime.id}">View Comments</button>

`
divFront.append(img, pRating)

divInner.append(divFront, divBack)
divFlipcard.append(divInner)

animeCollection.append(divFlipcard)

} 

// click view comment btn
const showCommentDiv = document.querySelector('.show-comment')
animeCollection.addEventListener('click', (event) => {
    if(event.target.matches('button.view-comments') ){
    // show comment
        showCommentDiv.innerHTML = ""
        const addComment = document.querySelector('#add-btn')
        addComment.dataset.id = event.target.dataset.id
        fetch("http://localhost:3000/comments")
            .then(res => res.json())
            .then((allComments) => {
                console.log(allComments);
                const comments = allComments.filter(comment => comment.anime_id === parseInt(event.target.dataset.id))
                comments.forEach(renderComments)
            
            })
    }
    else if(event.target.matches('.watch-later-btn')){
 
        fetch('http://localhost:3000/watch_later_lists', {            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            
                anime_id: parseInt(event.target.dataset.id),
                user_id: user.id

            })
        })
            .then(r => r.json())
            // .then()
    }

})

function renderComments(comment){
   
    const pComment = document.createElement('p')
    pComment.dataset.id = comment.id
    pComment.innerHTML = `${comment.content}       <button class="delete-btn">Delete</button>`
    
    showCommentDiv.append(pComment)
}

// add comment
const addSection = document.querySelector(".comment-container")
addSection.addEventListener('click', (event) => {
    if(event.target.matches('#add-btn')){

        event.preventDefault()
        const inputArea = document.querySelector('.input')
        const content = inputArea.value
        
        
       
        fetch('http://localhost:3000/comments', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                user_id: user.id,
                anime_id: event.target.dataset.id
            })
        })
        
            .then(r => r.json())
            .then(comment => { 
                renderComments(comment)
                inputArea.value = ""
            }) 
    }

})

// delete comment
showCommentDiv.addEventListener('click', (event) => {
    if(event.target.matches('.delete-btn')){
        
        let p = event.target.closest('p')
        fetch(`http://localhost:3000/comments/${p.dataset.id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(() => {
                p.remove()
            })
    }
})

// watch later
function showList(){
    laterDiv.innerHTML = ""
fetch("http://localhost:3000/watch_later_lists")
    .then(res => res.json())
    .then((lists) => {
        const currLists = lists.filter(list => list.user_id === user.id)
        const animes = currLists.map(list => list.anime)
        
        animes.forEach(anime => renderLater(anime, currLists))
    })
}

function renderLater(anime, myLists){
    const list = myLists.filter(list => list.anime_id === anime.id)
    const divFlipcard = document.createElement('div')
    divFlipcard.className = 'flip-card'
    const divInner = document.createElement('div')
    divInner.className = 'flip-card-inner'
    const divFront = document.createElement('div')
    divFront.className = 'flip-card-front'
    const img = document.createElement('img')
    img.src = anime.img_url
    img.alt = anime.name
    img.className = "anime-avatar"
    const pRating = document.createElement('h4')
    pRating.innerText = "Rating: 5"
    const divBack = document.createElement('div')
    divBack.className = 'flip-card-back'
    divBack.innerHTML = `
    <h2>${anime.name}</h2>
    <p>Author: ${anime.author}</p>
    <p>${anime.description}</p>
    <button class="remove-btn" data-id="${list[0].id}">Remove</button>  
    `
    divFront.append(img, pRating)
    
    divInner.append(divFront, divBack)
    divFlipcard.append(divInner)
    laterDiv.append(divFlipcard)
      
    } 

    // remove from watch later
laterDiv.addEventListener('click', (event) => {
    if(event.target.matches('.remove-btn')){
        let card = event.target.closest('.flip-card')
        card.remove()
 
        fetch(`http://localhost:3000/watch_later_lists/${event.target.dataset.id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())

    }
})










