// -------------------------------------
// ## DOM ELEMENTS ###
// --------------------------------------

const
    floatingActionButton = document.querySelector('.lam_floating-actions_button'),

    pickList = document.querySelector('.lam_floating-actions_list'),
    pickListItems = pickList.querySelectorAll('li'),
    pickListSubOptionDisplay = document.querySelector('.lam_floating-actions_choice'),

    subPickListCategory = document.querySelector('.lam_floating-actions_choice_category'),
    subPickListCategoryItems = subPickListCategory.querySelectorAll('li'),
    subPickListAuthor = document.querySelector('.lam_floating-actions_choice_author'),
    subPickListAuthorItems = subPickListAuthor.querySelectorAll('li'),
    subPickListDate = document.querySelector('.lam_floating-actions_choice_date'),
    subPickListDateElements = document.querySelectorAll('input'),
    startDateElement = document.querySelector('#start-date'),
    endDateElement = document.querySelector('#end-date'),
    subPickListPlaceholder = document.querySelector('.placeholder-for-js-state'),

    hiddenForm = document.querySelector('.lam_floating-actions_form'),
    hiddenFormInput = hiddenForm.querySelector('input'),

    entrySection = document.querySelector('.lam_entries')



// -------------------------------------
// ## EVENTS ##
// -------------------------------------

//
// 'CALLBACK FUNCTIONS FOR THE EVENTS'
//

const submitTheChoosenOption = (option, optionValue)=>{
    hiddenFormInput.setAttribute('name', option)
    hiddenFormInput.value = optionValue
    console.log(hiddenFormInput)
    hiddenForm.submit()
}

const checkOverflow = (elem) => {
    const elemWidth = elem.getBoundingClientRect().height
    const parentWidth = elem.parentElement.getBoundingClientRect().height

    return elemWidth > parentWidth
}


// 
// 'LISTENERS'
//

// => show the pick list / hide the pick list
let clickState = 0

floatingActionButton.addEventListener('click', ()=>{
  
    if(clickState === 0){
        entrySection.style.display = 'none'
        pickList.style.left = '-2.5rem'
        pickListSubOptionDisplay.style.display = 'flex'
        clickState = 1
    }
    else{
        entrySection.style.display = 'flex'
        pickList.style.left = '100vw'
        pickListSubOptionDisplay.style.display = 'none'
        clickState = 0
    }
   
})

// => show the choosen sub options lists 
let 
    selectedOption = '',
    currentSubOptionsList = subPickListPlaceholder

pickListItems.forEach(pickListItem =>{
    pickListItem.addEventListener('click', ()=>{
        selectedOption = pickListItem.innerHTML

        // console.log('the selected option is =>', selectedOption)
        // console.log('current sub options list', currentSubOptionsList)

        switch (selectedOption){
            case 'Kategorie':
                currentSubOptionsList.style.display = 'none'
                currentSubOptionsList = subPickListCategory
                currentSubOptionsList.style.display = 'flex'
                break

            case 'Autor':
                currentSubOptionsList.style.display = 'none'
                currentSubOptionsList = subPickListAuthor
                currentSubOptionsList.style.display = 'flex'
                console.log(checkOverflow(currentSubOptionsList))
                break

            case 'Zeitraum':
                currentSubOptionsList.style.display = 'none'
                currentSubOptionsList = subPickListDate
                currentSubOptionsList.style.display = 'flex'
                break

            case 'Kein Filter' :
                currentSubOptionsList.style.display = 'none'
                window.open('./index.php')
        }
    })
})

// => send the choosen sub option
subPickListCategoryItems.forEach(listItem =>{
    listItem.addEventListener('click', ()=>{
        optionToSend = listItem.innerHTML
        submitTheChoosenOption('category', optionToSend)
    })
})

subPickListAuthorItems.forEach(listItem =>{
    listItem.addEventListener('click', ()=>{
        optionToSend = listItem.innerHTML
        submitTheChoosenOption('author', optionToSend)
    })
})

subPickListDateElements.forEach(dateElement =>{
    dateElement.addEventListener('click', (event)=>{
        const 
            clickedDateElement = event.target,
            currentDate = new Date().toISOString().split('T')[0]

        clickedDateElement.setAttribute('max', currentDate)

        clickedDateElement === startDateElement
        ? console.log('start date is clicked')
        : console.log('end date is clicked')

        console.log('the current date', currentDate)
        console.log('the clicked date element', clickedDateElement)
        console.log('value of the clickedDateElement', clickedDateElement.value)

        clickedDateElement.onchange = ()=>{
            console.log('end date changed', endDateElement.value)

            if(startDateElement.value && endDateElement.value){
                console.log('two dates exist')

                const fullSearchedDate = [startDateElement.value, endDateElement.value]

                submitTheChoosenOption('time', fullSearchedDate)
            }
        }
      
            
    })
})


