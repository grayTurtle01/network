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
    div.className = 'post text-left'
    div.innerHTML = `
    <div class="post-header mb-2">
                
      <div class="post-header-left">

        <img class="post-image" src="${post.creator_image}" >
        <a href="/profile/${post.creator}/1">
            <h4>${ post.creator }</h4>
        </a>
      </div>

      <small class='text-secondary'>${post.timestamp }</small>
   </div>

      <p class="ml-2">${post.message}</p>      
      <textarea style="display: none;"></textarea>
      <button style="display: none;" class="btn btn-sm btn-info mt-1">Update</button>

      <i class="fa fa-heart"></i>
      <span>${post.likes }</span> <br> 
    `
    document.querySelector('#posts').prepend(div)
    document.querySelector('#message').value = ""
  })
  


  return false
}

// edit_buttons = document.querySelectorAll('.edit')
// for (button of edit_buttons){
//     button.onclick = function(){

//       edit_button = this
//       edit_button.style.display = 'none'
//       post_id = this.dataset.post_id

//       post = this.parentNode
//       p = post.querySelector('p')
//       message = p.innerText

//       edit_area = post.querySelector('textarea')
//       edit_area.innerHTML = message
//       p.style.display = 'none'

//       edit_area.style.display = 'block'

//       update_btn = post.querySelector('button')
//       update_btn.style.display = 'inline'

//       update_btn.onclick = function (){
//         post = this.parentNode
//         p.innerHTML = edit_area.value
        
//         new_message = edit_area.value

//         fetch("/update_post",{
//           'method': 'POST',
//           'body': JSON.stringify({
//             'post_id' : post_id,
//             'new_message': new_message
//           })
//         })
//         .then( res => res.text())
//         .then( msg => console.log(msg))
//         .then( () =>  { 
//           edit_area.style.display = 'none'
//           this.style.display = 'none'
//           edit_button.style.display = 'inline-block'
//           p.style.display = 'block'
//         })  
//       }   
      


//     }
// }

