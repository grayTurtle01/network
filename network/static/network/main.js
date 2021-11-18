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