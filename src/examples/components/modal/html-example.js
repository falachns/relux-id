const dialog = document.querySelector(".relux-dialog")
const openBtn = document.querySelector("[data-open-dialog]")
const closeBtn = document.querySelector("[data-close-dialog]")

if (openBtn && dialog) {
  openBtn.addEventListener("click", () => dialog.showModal())
}
if (closeBtn && dialog) {
  closeBtn.addEventListener("click", () => dialog.close())
}