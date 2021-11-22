
let page_buttons = document.querySelectorAll('.page-number')
let pages = page_buttons.length

// inicial state
if( localStorage.getItem('current_page') == null){
  localStorage.setItem('current_page', 1)
  first = page_buttons[0]
  first.className += ' active'
}
else{
  current_page = parseInt(localStorage.getItem('current_page'))
  boton = page_buttons[current_page-1]
  boton.className += ' active'

  next = document.querySelector('.next')
  if( current_page < pages ){
    next_page = parseInt(current_page) + 1
    next.href = `/render_page_number/${next_page}`
  }
  else{
    next.href = `/render_page_number/${pages}`
  }

}

// Page Buttons
page_buttons.forEach( button => {
  button.onclick = function(){
    let page_number = this.dataset.page_number
    button.className += ' active'
    localStorage.setItem('current_page', page_number) 

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
  current_page = parseInt(localStorage.getItem('current_page'))

  if( current_page < pages){
    localStorage.setItem('current_page', parseInt(current_page) + 1)
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