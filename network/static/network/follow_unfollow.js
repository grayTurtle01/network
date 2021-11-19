document.querySelector('#follow_unfollow').onclick = (event) => {
  boton = event.target
  profile_id = boton.dataset.profile_id
  

  fetch(`/follow_unfollow/${profile_id}`)
    .then( res => res.json())
    .then( data => {
      followers = document.querySelector('#followers')
      if( data.message == 'follow'){
        followers.innerText = parseInt(followers.innerText) + 1
        document.querySelector('#follow_unfollow').innerText = 'Unfollow'
      }
      else if( data.message == 'unfollow'){
        followers.innerText = parseInt(followers.innerText) - 1
        document.querySelector('#follow_unfollow').innerText = 'Follow'
      }
    })
    .catch( err => console.log(err))
}