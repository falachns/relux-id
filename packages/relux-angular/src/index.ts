/**
 * Standalone Angular Component & Directive declarations for @kai/relux-angular
 * Adheres to Angular 17+ standalone patterns and Make Kit CSS canonical tokens.
 */

export interface ReluxButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | string
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

export interface ReluxBadgeProps {
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  variant?: 'filled' | 'outline'
  size?: 'sm' | 'md'
  dot?: boolean
}

export interface ReluxAlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  dismissible?: boolean
}

export const RELUX_ANGULAR_COMPONENTS = [
  'ReluxButtonDirective',
  'ReluxBadgeComponent',
  'ReluxAlertComponent',
  'ReluxInputDirective',
  'ReluxCardComponent',
  'ReluxTabsComponent',
  'ReluxAccordionComponent',
] as const
