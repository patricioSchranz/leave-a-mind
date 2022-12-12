// -------------------------------------
// ## DOM ELEMENTS ###
// --------------------------------------

const
    formControlButton = document.querySelector('.lam_form-controll-button'),
    theForm = document.querySelector('.lam_form'),

    inputAuthorName = theForm['name'],
    hintAuthor = inputAuthorName.nextElementSibling,

    inputTitle = theForm['title'],
    hintTitle = inputTitle.nextElementSibling,

    inputContent = theForm['message'],
    hintContent = inputContent.nextElementSibling



// -------------------------------------
// ## EVENTS ##
// -------------------------------------


// 
// 'LISTENERS'
//


// SHOW THE FORM, HANDLE THE FORM, SUBMIT THE FORM

let 
    formState = 0, // state of the form process to control actions
    formValid = false // state of the form validity

const regExp_alphanumericWhitespace = /[^\w\s]/g // match all that is not ([^]) alphanumeric (\w) or whitespace (\s) globaly (/g)

// let test = "Rute   8 "
// console.log(test.match(regExp_alphanumericWhitespace))

// test.match(regExp_alphanumericWhitespace) || console.log('match valid input')
// test.match(regExp_alphanumericWhitespace) && console.log('match invalid input')

// => create an object for each form element
const formElements = [
    {
        name : 'author',
        element: inputAuthorName,
        regExp: regExp_alphanumericWhitespace,
        errorMessage: "",
        hintDisplay: hintAuthor,
        valid: false
    },
    {
        name : 'title',
        element: inputTitle,
        regExp: regExp_alphanumericWhitespace,
        errorMessage: "",
        hintDisplay: hintTitle,
        valid: false
    },
    {
        name : 'message',
        element: inputContent,
        errorMessage: "",
        hintDisplay: hintContent,
        regExp: null,
        valid: false
    }
]

// formElements.forEach(input =>{
//     const {name, valid, regExp} = input

//     console.log(regExp)
// })

// => validate the form datas
const validateForm = formElements =>{
    console.log('--- validateForm() ---')

    formElements.forEach((formElement, idx) =>{
        let 
            {name, element, regExp} = formElement,
            trimmedInputValue = element.value.trim()

        if(regExp){
            // console.log('element with regexp', name)
            trimmedInputValue.match(regExp)
            ? formElements[idx].errorMessage = `Unzulässige Eingabe: Es sind nur alphanumerische Werte und Leerzeichen erlaubt`
            : formElements[idx].valid = true
        }

        if(trimmedInputValue.length === 0){
            formElements[idx].errorMessage = 'Unzulässige Eingabe: Leeres Feld'
            formElements[idx].valid = false
        }

        if(name === 'message'){
            console.log('message length', trimmedInputValue.length)
            trimmedInputValue.length > 0 && (formElements[idx].valid = true)
        }
        
        console.log(`${name} is valid: ${formElements[idx].valid}`)
        console.log('error:', formElements[idx].errorMessage)  
    })

    console.log('---')
}

// => check if all form elements are valid / set whole form valid state
const checkIfAllElementsValid = formElements =>{
    let validElements = 0

    console.log('--- checkIfAllElementsValid() ---')

    formElements.forEach(element =>{
        console.log('name =>', element.name)
        console.log('valid ?', element.valid)
        console.log('count valid elements =>', validElements)

        element.valid && validElements++
        validElements === formElements.length && (formValid = true)
    })

    
    formValid && console.log('Form is valid')
    console.log('formvalid =>', formValid)
    console.log('formElements.length =>', formElements.length)
    console.log('valid elements =>', validElements)
    console.log('---')
}

// => if the valid state for the form is true, submit the form
//    else => throw the error messages / user hints
const submitFormOrShowError = (formElements) =>{
    console.log('- submitFormOrShowError -')

    if(formValid){
        // => before submit, delete the whitespaces from the start and the end of the input strings
        formElements.forEach(input =>{
            input.element.value = input.element.value.trim()
            console.log(input.element.value)
        })

        theForm.submit()
    }
    else{
        formElements.forEach(input =>{
            console.log(input.name)
            console.log(input.valid)
            console.log(input.hintDisplay)
            console.log(input.hintDisplay.innerHTML)

            input.valid || (input.hintDisplay.innerHTML = input.errorMessage)
        })
    }
    console.log('-  -')
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

            // console.log('child nodes of the button =>', formControlButton.childNodes[1])
            break

        case 1:
            // => change the button style
            formControlButton.style.backgroundColor = 'skyblue'
            formControlButton.childNodes[1].style.display = 'block'
            formControlButton.childNodes[3].style.display = 'none'

            validateForm(formElements)
            checkIfAllElementsValid(formElements)
            submitFormOrShowError(formElements)

            // => submit the form datas
            // theForm.submit()
           
            formState = 0
            break
    }
})