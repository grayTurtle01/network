function create_post_node(post_data){
  let post = post_data

  div = document.createElement('div')
  div.className = 'post text-left'
  div.innerHTML = `
  <div class="post-header mb-2">
              
    <div class="post-header-left">

      <img class="post-image" src="${post.creator_image}" >
      <a href="/profile/${post.creator}/1">
          <h4>${post.creator}</h4>
      </a>
    </div>

    <small class='text-secondary'>${post.timestamp }</small>
 </div>

    <p class="ml-2">${post.message}</p>      
    <textarea class="form-control" style="display: none;" ></textarea>
    <button style="display: none;" class="btn btn-sm btn-info mt-1">Update</button>

    <div class="post-footer">
      <div class="likes-div" data-post_id="${post.id}">
        <i class="fa fa-heart like"></i>
        <span class="likes">${post.likes }</span> <br> 
      </div>

      <div class="edit-div">
          <a class="btn btn-sm btn-info edit" data-post_id="${post.id}">Edit</a>
    </div>
    </div>
  `
  return div

}
