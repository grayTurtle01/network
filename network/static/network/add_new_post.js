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

    let post_node = create_post_node(post)

    document.querySelector('#posts').prepend(post_node)

    // Hide the last post when the post are more than 10
    let posts = document.querySelector('#posts')
    if(posts.childElementCount > 10)
      posts.removeChild(posts.lastElementChild)


    document.querySelector('#message').value = ""
    load_likes_buttons()
    load_edit_buttons()
  })
  


  return false
}

