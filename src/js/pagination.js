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


console.log('count of pages', countOfPages)
console.log('count of steps', countOfSteps)
console.log('count of steps from storage', countOfStepsFromStorage)
console.log('scroll count', scrollCount)

console.log('current url', url.length)
// console.log('includes the url a query named page ?', url.includes('page'))
// console.log('url params', urlParams)
console.log('current page', currentPage)
console.log('local storage offset', localStorage.getItem('offset'))


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

    console.clear()
    console.log('count of steps', countOfSteps)
    console.log('scroll count', scrollCount)
    console.log('offset', pageOptionsOffset)
    console.log('limit', pageOptionsLimit)

    if(scrollCount <= countOfSteps){
        
        pageOptionsLimit += 5
        pageOptionsOffset += 5

        showPageOptions()
        
        setLocalStorage()

        console.log('local storage offset', localStorage.getItem('offset'))
        console.log('p limit', pageOptionsLimit)

        scrollCount === countOfSteps && (buttonUp.disabled = true)
    }
    else {
        console.log(event.target)
        buttonUp.disabled = true
    }
})

buttonDown.addEventListener('click', ()=>{

    // => if the button up is disabled, remove the disabled state
    buttonUp.disabled && (buttonUp.disabled = false)

    scrollCount--

    console.clear()
    console.log('count of steps', countOfSteps)
    console.log('scroll count', scrollCount)
    console.log('offset', pageOptionsOffset)
    console.log('limit', pageOptionsLimit)

    
    if(scrollCount >= 1){
        
        pageOptionsLimit -= 5
        pageOptionsOffset -= 5

        showPageOptions()
        
        setLocalStorage()

        console.log('local storage offset', localStorage.getItem('offset'))
        console.log('p limit', pageOptionsLimit)

        scrollCount === 1 && (buttonDown.disabled = true)
    }
    else {
        buttonDown.disabled = true
    }
})


