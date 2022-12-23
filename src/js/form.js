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

// => validate the form datas
const validateForm = formElements =>{

    formElements.forEach((formElement, idx) =>{
        let 
            {name, element, regExp} = formElement,
            trimmedInputValue = element.value.trim()

        // => if a element has a regular expression to check, check if anything match
        if(regExp){

            if(trimmedInputValue.match(regExp)){
                formElements[idx].errorMessage = `Unzulässige Eingabe: <br> Es sind nur alphanumerische Werte <br> und Leerzeichen erlaubt`
                formElements[idx].valid = false
            }
             else if(!trimmedInputValue.match(regExp)){
                formElements[idx].errorMessage = ''
                formElements[idx].valid = true
             }
        }
        // => if there is no regEx for a element, it must still contain at least one character
        else if(!regExp){
            trimmedInputValue.length > 0 && (formElements[idx].valid = true)
        }

        // => each element musst contain at least one character
        if(trimmedInputValue.length === 0){
            formElements[idx].errorMessage = 'Unzulässige Eingabe: Leeres Feld'
            formElements[idx].valid = false
        } 
        else if(trimmedInputValue.length > 0 && formElements[idx].valid){
            formElements[idx].errorMessage = ''
            formElements[idx].valid = true
        }
    })

}

// => check if all form elements are valid / set whole form valid state
const checkIfAllElementsValid = formElements =>{
    let validElements = 0

    formElements.forEach(element =>{
        element.valid && validElements++
        validElements === formElements.length && (formValid = true)
    })

}

// => if the valid state for the form is true, submit the form
//    else => throw the error messages / user hints
const submitFormOrShowError = (formElements) =>{

    if(formValid){
        // => before submit, delete the whitespaces from the start and the end of the input strings
        formElements.forEach(input =>{
            input.element.value = input.element.value.trim()
        })

        theForm.submit()
    }
    else{
        formElements.forEach(input =>{
            input.valid || (input.hintDisplay.innerHTML = input.errorMessage)
            input.valid && (input.hintDisplay.innerHTML = input.errorMessage)
        })
    }
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

            break

        case 1:
            // => validate the form elements
            validateForm(formElements)

            // => check the valid state of the whole form
            checkIfAllElementsValid(formElements)

            // => if form is valid, reset the button style and form state
            if(formValid){
                // => change the button style
                formControlButton.style.backgroundColor = 'skyblue'
                formControlButton.childNodes[1].style.display = 'block'
                formControlButton.childNodes[3].style.display = 'none'

                // => reset the form state
                formState = 0
            }

            // => submit form or show user hints
            submitFormOrShowError(formElements)
            
            break
    }
})