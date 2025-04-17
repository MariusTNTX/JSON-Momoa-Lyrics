function updateIcon() {
  if (localStorage.getItem('dark-mode')) {
    iconSpan.textContent = "☀️";
    document.body.classList.add("dark-mode");
  } else {
    iconSpan.textContent = "🌙";
    document.body.classList.remove("dark-mode");
  }
}

const toggleBtn = document.querySelector(".dark-mode-toggle");
const iconSpan = toggleBtn.querySelector("span");

updateIcon();
toggleBtn.addEventListener("click", () => {
  if(localStorage.getItem('dark-mode')) localStorage.removeItem('dark-mode');
  else localStorage.setItem('dark-mode', 'true');
  updateIcon();
});