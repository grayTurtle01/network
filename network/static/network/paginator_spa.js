let page_index = 1

let page_buttons = document.querySelectorAll('.page-number')
let pages = page_buttons.length

let current_btn = page_buttons[0]
current_btn.classList.add('active')


for( btn of page_buttons ){
  btn.onclick = function(){
    current_btn.classList.remove('active')
    this.classList.add('active')
    page_index = this.dataset.page_number

    current_btn = this

    console.log(page_index)
    
    update_border_buttons()
  }
}

function update_border_buttons(){
  let prev_btn = document.querySelector('.previous')
  let next_btn = document.querySelector('.next')
  let prev_btn_li = prev_btn.parentNode 
  let next_btn_li = next_btn.parentNode 

  if ( page_index > 1 ){
   prev_btn_li.classList.remove('disabled')
   prev_btn_li.onclick = `fetch_posts(${page_index-1})`
  }
  else{
    prev_btn_li.classList.add('disabled')
  }

  if ( page_index >= pages ){
    next_btn_li.classList.add('disabled')
   }
   else{
     next_btn_li.classList.remove('disabled')
     next_btn_li.onclick = `fetch_posts(${page_index+1})`
   }


}

// hangle border clicks
document.querySelector('.next').onclick = function(){
  current_btn.classList.remove('active')
  
  current_btn = page_buttons[page_index]
  current_btn.classList.add('active')

  page_index++
  fetch_posts(page_index)

  update_border_buttons()
}

document.querySelector('.previous').onclick = function(){
  
  current_btn.classList.remove('active')
  
  prev_btn = page_buttons[page_index-2]
  current_btn = prev_btn

  current_btn.classList.add('active')
  
  page_index--
  fetch_posts(page_index)

  update_border_buttons()
}