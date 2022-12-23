// ----------------------
// HANDLE LOCAL STORAGE
// -----------------------

const pageParam = new URLSearchParams(location.search).get('page')

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


storageScrollCount === 1 && (theDownButton.disabled = true)
storageScrollCount === storageCountOfSteps && (theUpButton.disabled = true)