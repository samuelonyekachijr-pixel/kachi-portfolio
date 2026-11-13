const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileScreen = window.matchMedia("(max-width: 700px)");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.hidden = mobileScreen.matches && !isOpen;
}

function syncNavigation() {
  menuButton.hidden = !mobileScreen.matches;
  setMenuOpen(false);
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navigation.addEventListener("click", (event) => {
  if (mobileScreen.matches && event.target.closest("a")) {
    setMenuOpen(false);
    menuButton.focus({ preventScroll: true });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileScreen.addEventListener("change", syncNavigation);
syncNavigation();