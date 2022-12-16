const 
    textInput = document.querySelector('textarea')
    freeCharacterHint = document.querySelector('.free-character-hint'),
    freeChars = 5000

freeCharacterHint.innerHTML = `Es sind ${freeChars} Zeichen verfügbar`

textInput.addEventListener('input', ()=>{

    let currentFreeChars = freeChars - textInput.value.length

    freeCharacterHint.innerHTML = `Es sind noch ${currentFreeChars} Zeichen verfügbar`

    // => if there a less than 100 free characters, make the hint color red
    currentFreeChars < 100 && (freeCharacterHint.classList.add('hint'))

    // => if there a more than 100 free characters, make the hint color green
    currentFreeChars < 100 || (freeCharacterHint.classList.remove('hint'))

    // => if there a zero or less free characters, print only the current character state
    currentFreeChars <= 0 && (freeCharacterHint.innerHTML = `${currentFreeChars} Zeichen`)

    // => if there a zero or less free characters, change the textare background color to red
    currentFreeChars <= 0 && (textInput.style.background = 'tomato')
    
    // => if there a zero or less free characters, change the textare background color to white
    currentFreeChars <= 0 || (textInput.style.background = '#fff')
})