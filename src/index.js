//save URL, divs, and form into variables
const url = 'http://localhost:3000/characters'
const characterBar = document.querySelector('#character-bar')
const characterInfo = document.querySelector('#detailed-info')
let characterVotes = document.querySelector('#vote-count')

//make a fetch request using URL to access data from json file
fetch(url)
//convert that data into javascript so we can work with it
.then(res => res.json())
.then(characters => {
    //when you refresh, set the characterInfo to first character
    const name = characterInfo.querySelector('#name')
    const image = characterInfo.querySelector('#image')
    name.textContent = characters[0].name
    image.src = characters[0].image
    characterVotes.textContent = 0

    //iterate through each character and add to the character bar
    characters.forEach(character => addToCharacterBar(character))
})
//catch any errors and print in console
.catch(err => console.log(err))

//create function addToCharacterBar that takes each character as a parameter 
const addToCharacterBar = (character) => {
    //create a span element for each character and input their name into it, add that span to the character bar
    const span = document.createElement('span')
    span.textContent = character.name
    characterBar.append(span)

    //make an event listener that fires every time you click on a span element
    span.addEventListener('click', (e) => {
        const name = characterInfo.querySelector('#name')
        const image = characterInfo.querySelector('#image')

        //when you click, it changes the character info to the character info of the span clicked
        name.textContent = character.name
        image.src = character.image

        characterVotes.textContent = character.votes
    })

}


//grab the form via it's id
const form = document.querySelector('#votes-form')

//add an event listener to fire when form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //convert current votes to an integer and the inputed vote to an integer
    let currentVotes = parseInt(characterVotes.textContent, 10)
    let addedVotes = parseInt(e.target.votes.value, 10)
    //add the inputed vote to the current votes and input that number into the textContent
    characterVotes.textContent = (currentVotes += addedVotes)
    console.log(characterVotes.textContent)
    form.reset()

    //Use PATCH to reset character votes in json file to adjusted votes^^
    fetch(url)
    .then(res => res.json())
    .then(characters => {
        const charName = document.querySelector('#name')
        const charID = characters.find(character => character.name === charName.textContent)
        console.log(charID)
        fetch(`${url}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                votes : characterVotes.textContent
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    })
})



//reset button is a little buggy
const resetButton = document.querySelector('#reset-btn')

resetButton.addEventListener('click', (e) => {

    fetch(url)
    .then(res => res.json())
    .then(characters => {
        const charName = document.querySelector('#name')
        const charID = characters.find(character => character.name === charName.textContent)
        console.log(charID)
        fetch(`${url}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                votes : '0'
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    })

    characterVotes.textContent = character.votes
})


//Add new character using POST method
const addNewForm = document.querySelector("#character-form")

addNewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newName = e.target.name.value
    const newImage = e.target['image-url'].value

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name : newName,
            image : newImage,
            votes : '0',
        })
    })
    .then(res => res.json())
    .then(data => addToCharacterBar(data))
    .catch(err => console.log(err))
})


