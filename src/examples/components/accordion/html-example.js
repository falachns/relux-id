document.querySelectorAll('.relux-accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
    const panelId = trigger.getAttribute('aria-controls')
    const panel = document.getElementById(panelId)
    if (panel) {
      trigger.setAttribute('aria-expanded', String(!isExpanded))
      panel.hidden = isExpanded
    }
  })
})