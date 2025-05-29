
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const postsContainer = document.getElementById("postsContainer");

let selectedMedia = { photo: null, video: null, audio: null };
let editingPost = null;

document.getElementById("photoBtn").addEventListener("click", () => {
  document.getElementById("photoInput").click();
});
document.getElementById("videoBtn").addEventListener("click", () => {
  document.getElementById("videoInput").click();
});
document.getElementById("audioBtn").addEventListener("click", () => {
  document.getElementById("audioInput").click();
});
document.getElementById("locationBtn").addEventListener("click", () => {
  alert("📍 Location feature coming soon!");
});

document.getElementById("photoInput").addEventListener("change", (e) => {
  selectedMedia.photo = e.target.files[0] || null;
});
document.getElementById("videoInput").addEventListener("change", (e) => {
  selectedMedia.video = e.target.files[0] || null;
});
document.getElementById("audioInput").addEventListener("change", (e) => {
  selectedMedia.audio = e.target.files[0] || null;
});

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return;

  const postDiv = document.createElement("div");
  postDiv.className = "post";

  postDiv.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
  `;

  if (selectedMedia.photo) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedMedia.photo);
    img.style.maxWidth = "300px";
    img.style.marginTop = "10px";
    postDiv.appendChild(img);
  }

  if (selectedMedia.video) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(selectedMedia.video);
    video.controls = true;
    video.style.maxWidth = "300px";
    video.style.marginTop = "10px";
    postDiv.appendChild(video);
  }

  if (selectedMedia.audio) {
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(selectedMedia.audio);
    audio.controls = true;
    audio.style.marginTop = "10px";
    postDiv.appendChild(audio);
  }
  
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️ Delete";
  deleteBtn.className = "action-btn";
  deleteBtn.onclick = () => {
    postDiv.remove();
    showMessage("🗑️ Post Deleted!");
  };

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️ Edit";
  editBtn.className = "action-btn";
  editBtn.onclick = () => {
    titleInput.value = title;
    contentInput.value = content;
    postDiv.remove();
    showMessage("✏️ Editing mode: Update and Submit");
  };

  actionsDiv.appendChild(deleteBtn);
  actionsDiv.appendChild(editBtn);
  postDiv.appendChild(actionsDiv);

  postsContainer.prepend(postDiv); 

  postForm.reset();
  selectedMedia = { photo: null, video: null, audio: null };
  showMessage("✅ Post added successfully!");
});

// Show message
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ""), 2000);
}


const emojiToggleBtn = document.getElementById("emojiToggleBtn");
const emojiPicker = document.getElementById("emojiPicker");

emojiToggleBtn.addEventListener("click", () => {
  emojiPicker.style.display = emojiPicker.style.display === "block" ? "none" : "block";
});

emojiPicker.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const emoji = e.target.textContent;
    const cursorPos = contentInput.selectionStart;
    const textBefore = contentInput.value.substring(0, cursorPos);
    const textAfter = contentInput.value.substring(cursorPos);
    contentInput.value = textBefore + emoji + textAfter;
    contentInput.focus();
    contentInput.selectionEnd = cursorPos + emoji.length;
  }
});


document.addEventListener("click", (e) => {
  if (!emojiPicker.contains(e.target) && e.target.id !== "emojiToggleBtn") {
    emojiPicker.style.display = "none";
  }
});
