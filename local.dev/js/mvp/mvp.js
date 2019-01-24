(function(){

  // vars
  let searchBtn = document.querySelector('.navigation-primary-search button');
  let searchForm = document.querySelector('.navigation-primary-search form');
  let searchInput = document.querySelector('.navigation-primary-search form input');

  // eventlisteners
  searchBtn.addEventListener('click', (e) => {
    
    let searchExpanded = searchBtn.getAttribute('aria-expanded');

    if (searchExpanded === 'false') {
      searchBtn.setAttribute('aria-expanded', 'true');
      searchForm.setAttribute('aria-hidden', 'false');
      searchInput .focus();
    } else {
      searchBtn.setAttribute('aria-expanded', 'false');
      searchForm.setAttribute('aria-hidden', 'true');
    }
    
    
  });


})();