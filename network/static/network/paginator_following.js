
let page_buttons = document.querySelectorAll('.page-number')
let pages = page_buttons.length

// inicial state
if( localStorage.getItem('current_page_following') == null){
  localStorage.setItem('current_page_following', 1)
  first = page_buttons[0]
  first.className += ' active'
}
else{
  current_page_following = parseInt(localStorage.getItem('current_page_following'))
  boton = page_buttons[current_page_following-1]
  boton.className += ' active'

  // update next-button state
  next = document.querySelector('.next')
  if( current_page_following < pages ){
    next_page = parseInt(current_page_following) + 1
    next.href = `/following/${next_page}`
  }
  else{
    next.href = `/following/${pages}`
  }

  // update prvious-button state
  prev = document.querySelector('.previous')
  if( current_page_following > 1 ){
    prev_page = parseInt(current_page_following) - 1
    prev.href = `/following/${prev_page}`
  }
  else{
    prev.href = `/following/${1}`
  }

}

// Page Buttons
page_buttons.forEach( button => {
  button.onclick = function(){
    let page_number = this.dataset.page_number
    button.className += ' active'
    localStorage.setItem('current_page_following', page_number) 

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
  current_page_following = parseInt(localStorage.getItem('current_page_following'))

  if( current_page_following < pages){
    localStorage.setItem('current_page_following', parseInt(current_page_following) + 1)
  }
  else{
    return false
  }
}

// previous button
document.querySelector('.previous').onclick = () => {
  current_page_following = parseInt(localStorage.getItem('current_page_following'))

  if( current_page_following > 1){
    localStorage.setItem('current_page_following', parseInt(current_page_following) - 1)
  }
  else{
    return false
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