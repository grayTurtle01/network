document.querySelector('form').onsubmit = () => {
  let content = document.querySelector('#new_post').value
  
  fetch("/addPost", {
    method: 'POST',
    body: JSON.stringify({
      'content': content
    })
  })
  .then( res => res.text())
  .then( msg => console.log(msg))
  
  return false
}