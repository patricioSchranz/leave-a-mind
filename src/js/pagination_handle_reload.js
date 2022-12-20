// ----------------------
// HANDLE LOCAL STORAGE
// -----------------------

const pageParam = new URLSearchParams(location.search).get('page')

console.log('is there a page query ?', pageParam)

// => if there is no page query delete the local storage for this domain
pageParam || localStorage.clear()


// ----------------------
// HANDLE BUTTONS
// -----------------------

const
    theDownButton = document.querySelector('.lam_entries_pagination_pages-down'),
    theUpButton = document.querySelector('.lam_entries_pagination_pages-up'),
    storageCountOfSteps = parseInt(localStorage.getItem('countOfSteps')),
    storageScrollCount = parseInt(localStorage.getItem('scrollCount'))

console.log('COUNT OF STEPS', storageCountOfSteps)
console.log('SCROLL COUNT', storageScrollCount)

storageScrollCount === 1 && (theDownButton.disabled = true)
storageScrollCount === storageCountOfSteps && (theUpButton.disabled = true)