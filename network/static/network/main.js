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


