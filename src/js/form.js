// -------------------------------------
// ## DOM ELEMENTS ###
// --------------------------------------

const
    formControlButton = document.querySelector('.lam_form-controll-button'),
    theForm = document.querySelector('.lam_form'),
    inputAuthorName = theForm['name'],
    inputTitle = theForm['title'],
    inputContent = theForm['message']




// -------------------------------------
// ## EVENTS ##
// -------------------------------------


// 
// 'LISTENERS'
//


// SHOW THE FORM, HANDLE THE FORM, SUBMIT THE FORM

let 
    formState = 0,
    formValid = false

const regExp_alphanumericWhitespace = /[^\w\s]/g

// let test = "Rute   8 "
// console.log(test.match(regExp_alphanumericWhitespace))

// test.match(regExp_alphanumericWhitespace) || console.log('match valid input')
// test.match(regExp_alphanumericWhitespace) && console.log('match invalid input')

const formElements = [
    {
        name : 'author',
        element: inputAuthorName,
        regExp: regExp_alphanumericWhitespace,
        errorMessage: "",
        valid: false
    },
    {
        name : 'title',
        element: inputTitle,
        regExp: regExp_alphanumericWhitespace,
        errorMessage: "",
        valid: false
    },
    {
        name : 'message',
        element: inputContent,
        errorMessage: "",
        regExp: null,
        valid: false
    }
]

// formElements.forEach(input =>{
//     const {name, valid, regExp} = input

//     console.log(regExp)
// })

// const validateTheForm = (array){

// }

const validateForm = formElements =>{
    formElements.forEach((formElement, idx) =>{
        let 
            {name, element, regExp, valid, errorMessage} = formElement,
            trimmedInputValue = element.value.trim()

        if(regExp){
            trimmedInputValue.match(regExp)
            ? errorMessage = `Unzulässige Eingabe: Es sind nur alphanumerische Werte und Leerzeichen erlaubt`
            : formElements[idx].valid = true
        }

        if(trimmedInputValue.length === 0){
            errorMessage = 'Unzulässige Eingabe: Leeres Feld'
            valid = false
        }

        if(name === 'message'){
            trimmedInputValue.length > 0 && (valid = true)
        }
        
        console.log(`${name} is valid: ${valid}`)
        console.log('error:', errorMessage)
    })
}

const checkIfAllElementsValid = formElements =>{
    let validElements = 0

    console.log('the form elements / check function', formElements)

    formElements.forEach(element =>{
        console.log('name =>', element.name)
        console.log('valid ?', element.valid)
        console.log('count valid elements =>', validElements)
        element.valid && console.log(element.valid)
        console.log('count valid elements =>', validElements)
        // validElements === formElements.length && (formValid = true)
    })

    formValid && console.log('Form is valid')
    console.log(formValid)
    console.log(formElements.length)
    console.log(validElements)
}

formControlButton.addEventListener('click', ()=>{
    switch (formState){
        case 0:
            // => show the form and change the button style
            theForm.style.display = 'flex'
            formControlButton.style.backgroundColor = '#B6C649'
            formControlButton.childNodes[1].style.display = 'none'
            formControlButton.childNodes[3].style.display = 'block'

            // => change the state of this process
            formState = 1

            console.log('child nodes of the button =>', formControlButton.childNodes[1])
            break

        case 1:
            // => change the button style
            formControlButton.style.backgroundColor = 'skyblue'
            formControlButton.childNodes[1].style.display = 'block'
            formControlButton.childNodes[3].style.display = 'none'

            console.log('the form elements', formElements)

            // validateForm(formElements)

            console.log('the form elements after validation', formElements)
            checkIfAllElementsValid(formElements)

            // => submit the form datas
            // theForm.submit()
           
            formState = 0
            break
    }
})