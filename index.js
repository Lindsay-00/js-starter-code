// write JS code here

// current user
let user = null
// navbar
function classToggle() {
    const navs = document.querySelectorAll('.Navbar__Items')
    
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  }
  
  document.querySelector('.Navbar__Link-toggle')
    .addEventListener('click', classToggle);

// sign up
const signBtn = document.querySelector('#sign')
const signContainer = document.querySelector('.container')
const signForm = document.querySelector(".sign-up-form")
signBtn.addEventListener('click', () => {
    if (signContainer.style.display === 'none') {
      signContainer.style.display = 'block'
    } else {
      signContainer.style.display = 'none'
    }
  })

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
const animeBtn = document.querySelector('#anime')
const animeDiv = document.querySelector('.page2')
animeBtn.addEventListener('click', () => {
    if (animeDiv.style.display === 'none') {
      animeDiv.style.display = 'block'
    } else {
      animeDiv.style.display = 'none'
    }
  })

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
<button class="watch-later-btn">Watch Later</button>
<button class="view-comments" dataset-id="${anime.id}">View Comments</button>

`
divFront.append(img, pRating)

divInner.append(divFront, divBack)
divFlipcard.append(divInner)

animeCollection.append(divFlipcard)





} 

// click view comment btn

animeCollection.addEventListener('click', (event) => {
    if(event.target.matches('button.view-comments') ){
    // show comment
        fetch("http://localhost:3000/comments")
            .then(res => res.json())
            .then((allComments) => {
                console.log(allComments);
                const comments = allComments.filter(comment => comment.anime_id === event.target.dataset.id)
                comments.forEach(renderComments)
          
            })

        function renderComments(comment){
            
            const showCommentDiv = document.querySelector('.show-comment')
            showCommentDiv.innerHTML = `
            <p>${comment.content}</p>
            `
 
 
        }
    }
})






