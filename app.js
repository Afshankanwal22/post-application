// let postForm=document.getElementById("postForm");
// let title=document.getElementById("title");
// let content=document.getElementById("content");
// let submit=document.getElementById("submitBtn");
// let message=document.getElementById("message")
// let postsContainer=document.getElementById("postsContainer");

// let posts=[];
// let editingId=null;

// postForm.addEventListener("submit",function(e){
// e.preventDefault();
// const title=title.value.trim();
// const content=content.value.trim();

// if (title && content) {
//     if (editingId) {
//         posts=posts.map(post =>
//       post.id === editingId ? {...post,title,content} : post
//         );
      
//         showMessage("Post Updated!")
//         editingId= null;
//         submit.textContent = "Add Post";
//     }
//     else{
//         const newPost={
//             id: Date.now(),
//             title,
//             content
//         };
//         posts.unshift(newPost);
//         showMessage("Post added!");
//     }
//     postForm.reset();
//     renderPosts();
    
// }
// });

// function renderPosts() {
//     postsContainer.innerHTML=" ";
//     for (let i = 0; i < posts.length; i++) {
//         const post = posts[i];

//         const postEl=document.createElement("div");
//         postEl.className = "post";
//         postEl.innerHTML=`
//         <h3>${post.title}</h3>
//       <p>${post.content}</p>
//       <div class="actions">
//         <button onclick="editPost(${post.id})"><i class="fas fa-edit"></i></button>
//         <button onclick="deletePost(${post.id})"><i class="fas fa-trash-alt"></i></button>
//       </div>`
//          postsContainer.appendChild(postEl);
//     };    
// }
//  function deletePost(id) {
//     posts=posts.filter(post => post.id !==id);
//     renderPosts();
//     showMessage("Post Deleted");
//  }
// function editPost(id) {
//     const post=posts.find(p => p.id === id);
//     if (post) {
//        title.value=post.title;
//        content.value=post.content ;
//        editingId=id;
//        submit.textContent="Update Post";
//     }
// }
// function showMessage(text) {
//     message.textContent= text;
//     setTimeout(() => message.textContent ="",2000)
// }
let postForm = document.getElementById("postForm");
let titleInput = document.getElementById("title");
let contentInput = document.getElementById("content");
let submit = document.getElementById("submitBtn");
let message = document.getElementById("message");
let postsContainer = document.getElementById("postsContainer");

let posts = [];
let editingId = null;

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    if (editingId) {
      posts = posts.map(post =>
        post.id === editingId ? { ...post, title, content } : post
      );
      showMessage("Post Updated!");
      editingId = null;
      submit.textContent = "Add Post";
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content
      };
      posts.unshift(newPost);
      showMessage("Post Added!");
    }

    postForm.reset();
    renderPosts();
  }
});

function renderPosts() {
  postsContainer.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="editPost(${post.id})"><i class="fas fa-edit"></i></button>
        <button onclick="deletePost(${post.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    postsContainer.appendChild(postEl);
  }
}

function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
  renderPosts();
  showMessage("Post Deleted!");
}

function editPost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    title.value = post.title;
    content.value = post.content;
    editingId = id;
    submit.textContent = "Update Post";
  }
}
 
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => message.textContent = "", 2000);
}
