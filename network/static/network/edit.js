edit_buttons = document.querySelectorAll('.edit')
for (button of edit_buttons){
    button.onclick = function(){

      edit_button = this
      edit_button.style.display = 'none'
      post_id = this.dataset.post_id

      post = this.parentNode
      p = post.querySelector('p')
      message = p.innerText

      edit_area = post.querySelector('textarea')
      edit_area.innerHTML = message
      p.style.display = 'none'

      edit_area.style.display = 'block'
      edit_area.focus()

      update_btn = post.querySelector('button')
      update_btn.style.display = 'inline'

      update_btn.onclick = function (){
        post = this.parentNode
        p.innerHTML = edit_area.value
        
        new_message = edit_area.value

        fetch("/update_post",{
          'method': 'POST',
          'body': JSON.stringify({
            'post_id' : post_id,
            'new_message': new_message
          })
        })
        .then( res => res.text())
        .then( msg => console.log(msg))
        .then( () =>  { 
          edit_area.style.display = 'none'
          this.style.display = 'none'
          edit_button.style.display = 'inline-block'
          p.style.display = 'block'
        })  
      }   
      


    }
}

