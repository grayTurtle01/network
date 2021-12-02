function render_posts(posts){
  
  let posts_node = document.querySelector('#posts')
  for( let post of posts ){
    let post_node = create_post_node(post)
    posts_node.append(post_node)
  }
}

fetch("/get_posts/1" )
  .then( res => res.json())
  .then( data => {
    let posts = data.posts
    console.log(posts)
    render_posts(posts)
  })
  .then( ()=> {
    load_likes()
    load_edit_buttons()
  })
  .catch(err => console.log(err))
