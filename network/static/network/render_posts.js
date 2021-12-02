function render_posts(posts){
  
  let posts_node = document.querySelector('#posts')
  for( let post of posts ){
    let post_node = create_post_node(post)
    posts_node.append(post_node)
  }
}

function fetch_posts(page_number){
  fetch(`/get_posts/${page_number}` )
  .then( res => res.json())
  .then( data => {
    let posts = data.posts
    render_posts(posts)
    update_edit_buttons(data.user)
    return data.posts_liked
  })
  .then( (posts_liked)=> {
    update_likes_states(posts_liked)
    load_likes()
    load_edit_buttons()
  })
  .catch(err => console.log(err))  
}

function update_likes_states(posts_liked){
  let likes = document.querySelectorAll('.like')
  for( let like of likes){
    let post_id = parseInt(like.parentNode.dataset.post_id)
    if(  posts_liked.indexOf(post_id) != -1 ){
        like.style.color = 'red'
       
    }
  }
}

function update_edit_buttons(user){
  let posts = document.querySelectorAll('.post')

  for( let post of posts){
    let creator = post.querySelector('h4').innerText
    if(  creator != user ){
        let btn = post.querySelector('.edit')
        btn.style.display = 'none'
       
    }
  }
}

fetch_posts(1)