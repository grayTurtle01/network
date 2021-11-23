
let page_buttons = document.querySelectorAll('.page-number')
let pages = page_buttons.length
let username = document.querySelector('title').innerText

if( pages < 2 ){
  document.querySelector('.pagination').style.display = 'none'
}
else{

  // inicial state
  if( localStorage.getItem('current_page_profile') == null){
    localStorage.setItem('current_page_profile', 1)
    first = page_buttons[0]
    first.className += ' active'
  }
  else{
    current_page_profile = parseInt(localStorage.getItem('current_page_profile'))
    boton = page_buttons[current_page_profile-1]
    boton.className += ' active'
    
    // update next-button state
    next = document.querySelector('.next')
    if( current_page_profile < pages ){
      next_page = parseInt(current_page_profile) + 1
      next.href = `/profile/${username}/${next_page}`
    }
    else{
      next.href = `/profile/${username}/${pages}`
    }
    
    // update prvious-button state
  prev = document.querySelector('.previous')
  if( current_page_profile > 1 ){
    prev_page = parseInt(current_page_profile) - 1
    prev.href = `/profile/${username}/${prev_page}`
  }
  else{
    prev.href = `/profile/${username}/${1}`
  }
  
}

// Page Buttons
page_buttons.forEach( button => {
  button.onclick = function(){
    let page_number = this.dataset.page_number
    button.className += ' active'
    localStorage.setItem('current_page_profile', page_number) 
    
    for( btn of page_buttons ){
      if (btn.dataset.page_number != page_number){
        btn.classList.remove('active')
      }
    }
    
    //render_posts(page_number)
    
  }
})


// next button
document.querySelector('.next').onclick = () => {
  current_page_profile = parseInt(localStorage.getItem('current_page_profile'))
  
  if( current_page_profile < pages){
    localStorage.setItem('current_page_profile', parseInt(current_page_profile) + 1)
  }
  else{
    return false
  }
}

// previous button
document.querySelector('.previous').onclick = () => {
  current_page_profile = parseInt(localStorage.getItem('current_page_profile'))
  
  if( current_page_profile > 1){
    localStorage.setItem('current_page_profile', parseInt(current_page_profile) - 1)
  }
  else{
    return false
  }
}

}

function render_posts(page_number){
  fetch(`/get_posts/${page_number}`)
  .then( res => res.json() )
  .then( posts => {
    console.log(posts)
  })
  .catch(err => console.log(err))
}