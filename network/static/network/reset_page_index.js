links = document.querySelectorAll('.links')
for( link of links){
  link.onclick = function(){
    localStorage.setItem('current_page', 1)
    localStorage.setItem('current_page_profile', 1)
    localStorage.setItem('current_page_following', 1)
  }
}