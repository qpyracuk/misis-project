const themeButtons = document.querySelectorAll(".button-theme");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    themeButtons.forEach((btn) => {
      btn.removeAttribute("disabled");
    });
    if ([...button.classList].includes("button-theme__light")) {
      changeTheme("light");
    }
    if ([...button.classList].includes("button-theme__dark")) {
      changeTheme("dark");
    }
    button.setAttribute("disabled", true);
  });
});

function changeTheme(theme) {
  document.body.className = "page";
  document.body.classList.add(`theme_${theme}`);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
}

initTheme();