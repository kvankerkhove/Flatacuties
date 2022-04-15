//save URL, divs, and form into variables
const url = 'http://localhost:3000/characters'
const characterBar = document.querySelector('#character-bar')
const characterInfo = document.querySelector('#detailed-info')
let characterVotes = document.querySelector('#vote-count')

//make a fetch request using URL to access data from json file
fetch(url)
//convert that data into javascript so we can work with it
.then(res => res.json())
//iterate through each character and add to the character bar
.then(characters => characters.forEach(character => addToCharacterBar(character)))
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

        //set the charactervotes to 0
        characterVotes.textContent = 0
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
    form.reset()
})


