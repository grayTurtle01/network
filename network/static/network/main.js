document.querySelector('form').onsubmit = () => {
  let content = document.querySelector('#new_post').value
  console.log(content) 
  return false
}