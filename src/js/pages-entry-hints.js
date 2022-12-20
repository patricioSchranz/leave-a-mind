const
    displayPagesHint = document.querySelector('.lam_entries_page-info_all-pages-count'),
    allExistingPages = document.querySelectorAll('.lam_entries_pagination-number').length

displayPagesHint.innerHTML = allExistingPages