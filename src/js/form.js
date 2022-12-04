// -------------------------------------
// ## DOM ELEMENTS ###
// --------------------------------------

const
    formControlButton = document.querySelector('.lam_form-controll-button'),
    theForm = document.querySelector('.lam_form')



// -------------------------------------
// ## EVENTS ##
// -------------------------------------


// 
// 'LISTENERS'
//

// => show the form, handle the form, submit the form
let formState = 0

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

            // => submit the form datas
            theForm.submit()
           
            formState = 0
            break
    }
})