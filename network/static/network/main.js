document.querySelector('form').onsubmit = () => {
  let message = document.querySelector('#message').value
  
  fetch("/addPost", {
    method: 'POST',
    body: JSON.stringify({
      'message': message
    })
  })
  
  .then( res => res.json())
  .then( post => {
    div = document.createElement('div')
    div.className = 'post p-3 m-2 col-lg-4 col-sm-6'
    div.innerHTML = `
      <h4>${post.creator }</h4>
      <a href="#">Edit</a>
      <p>${ post.message }</p>
      <small class='text-secondary'>${ post.timestamp }</small>
      <br>
      <span>Likes: ${post.likes }</span> <br>
      <a href="#">Comment</a> 
    `
    document.querySelector('#posts').prepend(div)
    document.querySelector('#message').value = ""
  })
  


  return false
}

edit_buttons = document.querySelectorAll('.edit')
for (button of edit_buttons){
    button.onclick = function(){

      post_id = this.dataset.post_id

      post = this.parentNode
      p = post.querySelector('p')
      message = p.innerText

      textarea = document.createElement('textarea')
      textarea.innerHTML = message

      post.append(textarea)


      update_btn = document.createElement('button')
      update_btn.innerText = 'Update'

      update_btn.onclick = function (){
        post = this.parentNode
        p.innerHTML = textarea.value
        
        console.log(post_id)
        new_message = textarea.value

        fetch("/update_post",{
          'method': 'POST',
          'body': JSON.stringify({
            'post_id' : post_id,
            'new_message': new_message
          })
        })
        .then( res => res.text())
        .then( msg => console.log(msg))
        
      }   
      post.append(update_btn)


    }
}

