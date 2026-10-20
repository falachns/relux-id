document.querySelectorAll(".relux-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".relux-tab").forEach(item => {
      item.setAttribute("aria-selected", String(item === tab))
    })
  })
})