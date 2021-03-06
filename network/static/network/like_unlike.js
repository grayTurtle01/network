
function load_likes_buttons(){
  like_buttons = document.querySelectorAll('.like')
  for( like_btn of like_buttons ){
    like_btn.onclick = function(){
      post = this.parentNode
      post_id = post.dataset.post_id
      
      fetch("/like_unlike",{
        method: 'PUT',
        body: JSON.stringify({
          'post_id' : post_id
        })
      })
      .then( res => res.json())
      .then( data => {
        likes = post.querySelector('.likes')
        likes.innerText = data.likes
        if( data.message == "Like added"){
          this.style.color = 'red'
        }
        else{
          this.style.color = 'black'
        }

      } )
      
    }
  }
}
load_likes_buttons()