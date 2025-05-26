const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const postsContainer = document.getElementById("postsContainer");

let selectedMedia = { photo: null, video: null, audio: null };

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

  // Add photo if selected
  if (selectedMedia.photo) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedMedia.photo);
    img.style.maxWidth = "300px";
    img.style.marginTop = "10px";
    postDiv.appendChild(img);
  }

  // Add video if selected
  if (selectedMedia.video) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(selectedMedia.video);
    video.controls = true;
    video.style.maxWidth = "300px";
    video.style.marginTop = "10px";
    postDiv.appendChild(video);
  }

  // Add audio if selected
  if (selectedMedia.audio) {
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(selectedMedia.audio);
    audio.controls = true;
    audio.style.marginTop = "10px";
    postDiv.appendChild(audio);
  }

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";
  actionsDiv.innerHTML = `
    <button onclick="this.parentElement.parentElement.remove(); showMessage('🗑️ Post Deleted!')">Delete</button>
  `;
  postDiv.appendChild(actionsDiv);

  postsContainer.prepend(postDiv);

  postForm.reset();
  selectedMedia = { photo: null, video: null, audio: null };
  showMessage("✅ Post added successfully!");
});

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ""), 2000);
}
