// Button doesn't require native JavaScript for basic interaction.
document.querySelectorAll('.relux-button').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Button clicked:', btn.textContent.trim())
  })
})