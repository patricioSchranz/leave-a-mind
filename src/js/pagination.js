// ---------------------------------------
// VARIABLES PLACE
// ---------------------------------------

const 
    pages = document.querySelectorAll('.lam_entries_pagination-number'),
    countOfPages = pages.length,
    countOfSteps = Math.ceil(countOfPages / 5),
    countOfStepsFromStorage = localStorage.getItem('countOfSteps'),

    url = window.location.search,
    urlParams = new URLSearchParams(url),
    queryKeysIterator = urlParams.keys(),
    queryKeys = [],
    currentPage = urlParams.get('page'),

    buttonDown = document.querySelector('.lam_entries_pagination_pages-down'),
    buttonUp = document.querySelector('.lam_entries_pagination_pages-up')


let 
    pageOptionsOffset = 
        localStorage.getItem('offset')
        ? parseInt(localStorage.getItem('offset'))
        : 0,

    pageOptionsLimit = 
        localStorage.getItem('limit')
        ? parseInt(localStorage.getItem('limit'))
        : 4,

    scrollCount = 
        localStorage.getItem('scrollCount')
        ? parseInt(localStorage.getItem('scrollCount'))
        : 1


// ---------------------------------------
// FUNCTIONS
// ---------------------------------------

// => show a part of the page options
const showPageOptions = ()=>{
    pages.forEach(page =>{
        page.classList.contains('visible') && page.classList.replace('visible', 'hidden')
    })

    for(let x = pageOptionsOffset; x <= pageOptionsLimit; x++){
        pages[x] && (pages[x].classList.replace('hidden', 'visible'))
    }
}

showPageOptions()


const setLocalStorage = ()=>{
    localStorage.setItem('offset', pageOptionsOffset)
    localStorage.setItem('limit', pageOptionsLimit)
    localStorage.setItem('scrollCount', scrollCount)
    localStorage.setItem('countOfSteps', countOfSteps)
}


// ---------------------------------------
// EVENTS
// ---------------------------------------

buttonUp.addEventListener('click', (event)=>{

     // => if the button down is disabled, remove the disabled state
     buttonDown.disabled && (buttonDown.disabled = false)

    scrollCount++

    if(scrollCount <= countOfSteps){
        
        pageOptionsLimit += 5
        pageOptionsOffset += 5

        showPageOptions()
        
        setLocalStorage()

        scrollCount === countOfSteps && (buttonUp.disabled = true)
    }
    else {
        buttonUp.disabled = true
    }
})

buttonDown.addEventListener('click', ()=>{

    // => if the button up is disabled, remove the disabled state
    buttonUp.disabled && (buttonUp.disabled = false)

    scrollCount--
    
    if(scrollCount >= 1){
        
        pageOptionsLimit -= 5
        pageOptionsOffset -= 5

        showPageOptions()
        
        setLocalStorage()

        scrollCount === 1 && (buttonDown.disabled = true)
    }
    else {
        buttonDown.disabled = true
    }
})


