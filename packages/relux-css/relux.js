/**
 * RelUX by KAI — Vanilla JavaScript Runtime Helper
 * Compatible with Laravel Blade, Livewire, React, Angular, and static HTML.
 * Safe to be executed multiple times (idempotent).
 */

export function initRelux(root = document) {
  initAccordions(root)
  initTabs(root)
  initDialogs(root)
  initAlerts(root)
}

/**
 * Accordion disclosure handler
 */
function initAccordions(root) {
  const triggers = root.querySelectorAll('[data-relux-accordion-trigger]:not([data-relux-bound])')
  triggers.forEach((trigger) => {
    trigger.setAttribute('data-relux-bound', 'true')
    trigger.addEventListener('click', (e) => {
      e.preventDefault()
      const item = trigger.closest('[data-relux-accordion-item]')
      const container = trigger.closest('[data-relux-accordion]')
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
      const isSingle = container?.getAttribute('data-relux-type') !== 'multiple'

      if (isSingle && container) {
        const otherTriggers = container.querySelectorAll('[data-relux-accordion-trigger]')
        otherTriggers.forEach((other) => {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false')
            const otherItem = other.closest('[data-relux-accordion-item]')
            const otherPanel = otherItem?.querySelector('[data-relux-accordion-panel]')
            if (otherPanel) otherPanel.hidden = true
          }
        })
      }

      trigger.setAttribute('aria-expanded', String(!isExpanded))
      const panel = item?.querySelector('[data-relux-accordion-panel]')
      if (panel) {
        panel.hidden = isExpanded
      }
    })
  })
}

/**
 * Tabs switcher handler with keyboard roving tabindex
 */
function initTabs(root) {
  const tablists = root.querySelectorAll('[role="tablist"]:not([data-relux-bound])')
  tablists.forEach((tablist) => {
    tablist.setAttribute('data-relux-bound', 'true')
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'))

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tabs, index))

      tab.addEventListener('keydown', (e) => {
        let targetIndex = -1
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabs.length
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabs.length) % tabs.length
        } else if (e.key === 'Home') {
          targetIndex = 0
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1
        }

        if (targetIndex >= 0) {
          e.preventDefault()
          selectTab(tabs, targetIndex)
          tabs[targetIndex].focus()
        }
      })
    })
  })
}

function selectTab(tabs, activeIndex) {
  tabs.forEach((tab, i) => {
    const isSelected = i === activeIndex
    tab.setAttribute('aria-selected', String(isSelected))
    tab.setAttribute('tabindex', isSelected ? '0' : '-1')

    const controlsId = tab.getAttribute('aria-controls')
    if (controlsId) {
      const panel = document.getElementById(controlsId)
      if (panel) panel.hidden = !isSelected
    }
  })
}

/**
 * Dialog open/close handler
 */
function initDialogs(root) {
  const openButtons = root.querySelectorAll('[data-relux-dialog-trigger]:not([data-relux-bound])')
  openButtons.forEach((btn) => {
    btn.setAttribute('data-relux-bound', 'true')
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-relux-dialog-trigger')
      const dialog = document.getElementById(targetId)
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal()
      }
    })
  })

  const closeButtons = root.querySelectorAll('[data-relux-dialog-close]:not([data-relux-bound])')
  closeButtons.forEach((btn) => {
    btn.setAttribute('data-relux-bound', 'true')
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog')
      if (dialog && typeof dialog.close === 'function') {
        dialog.close()
      }
    })
  })
}

/**
 * Dismissible Alert close handler
 */
function initAlerts(root) {
  const dismissButtons = root.querySelectorAll('[data-relux-alert-dismiss]:not([data-relux-bound])')
  dismissButtons.forEach((btn) => {
    btn.setAttribute('data-relux-bound', 'true')
    btn.addEventListener('click', () => {
      const alert = btn.closest('.relux-alert')
      if (alert) {
        alert.remove()
      }
    })
  })
}

// Auto-bind on client load
if (typeof window !== 'undefined') {
  window.RelUX = {
    init: initRelux,
    reinit: initRelux,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initRelux())
  } else {
    initRelux()
  }

  // Livewire 3 support: livewire:navigated
  document.addEventListener('livewire:navigated', () => initRelux())

  // Livewire morph hook support
  if (window.Livewire?.hook) {
    window.Livewire.hook('morph.updated', ({ el }) => initRelux(el))
  }
}
