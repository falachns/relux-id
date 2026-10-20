import bladeButton from './button/blade-example.blade.php?raw'
import reactButton from './button/react-example.tsx?raw'
import angularButton from './button/angular-example.html?raw'
import htmlButton from './button/html-example.html?raw'
import cssButton from './button/html-example.css?raw'
import jsButton from './button/html-example.js?raw'

import bladeAccordion from './accordion/blade-example.blade.php?raw'
import reactAccordion from './accordion/react-example.tsx?raw'
import angularAccordion from './accordion/angular-example.html?raw'
import htmlAccordion from './accordion/html-example.html?raw'
import cssAccordion from './accordion/html-example.css?raw'
import jsAccordion from './accordion/html-example.js?raw'

import bladeBadge from './badge/blade-example.blade.php?raw'
import reactBadge from './badge/react-example.tsx?raw'
import angularBadge from './badge/angular-example.html?raw'
import htmlBadge from './badge/html-example.html?raw'
import cssBadge from './badge/html-example.css?raw'
import jsBadge from './badge/html-example.js?raw'

import bladeAlert from './alert/blade-example.blade.php?raw'
import reactAlert from './alert/react-example.tsx?raw'
import angularAlert from './alert/angular-example.html?raw'
import htmlAlert from './alert/html-example.html?raw'
import cssAlert from './alert/html-example.css?raw'
import jsAlert from './alert/html-example.js?raw'

import bladeCard from './card/blade-example.blade.php?raw'
import reactCard from './card/react-example.tsx?raw'
import angularCard from './card/angular-example.html?raw'
import htmlCard from './card/html-example.html?raw'
import cssCard from './card/html-example.css?raw'
import jsCard from './card/html-example.js?raw'

import bladeAvatar from './avatar/blade-example.blade.php?raw'
import reactAvatar from './avatar/react-example.tsx?raw'
import angularAvatar from './avatar/angular-example.html?raw'
import htmlAvatar from './avatar/html-example.html?raw'
import cssAvatar from './avatar/html-example.css?raw'
import jsAvatar from './avatar/html-example.js?raw'

import bladeProgress from './progress/blade-example.blade.php?raw'
import reactProgress from './progress/react-example.tsx?raw'
import angularProgress from './progress/angular-example.html?raw'
import htmlProgress from './progress/html-example.html?raw'
import cssProgress from './progress/html-example.css?raw'
import jsProgress from './progress/html-example.js?raw'

import bladeForm from './form/blade-example.blade.php?raw'
import reactForm from './form/react-example.tsx?raw'
import angularForm from './form/angular-example.html?raw'
import htmlForm from './form/html-example.html?raw'
import cssForm from './form/html-example.css?raw'
import jsForm from './form/html-example.js?raw'

import bladeModal from './modal/blade-example.blade.php?raw'
import reactModal from './modal/react-example.tsx?raw'
import angularModal from './modal/angular-example.html?raw'
import htmlModal from './modal/html-example.html?raw'
import cssModal from './modal/html-example.css?raw'
import jsModal from './modal/html-example.js?raw'

import bladeNavigation from './navigation/blade-example.blade.php?raw'
import reactNavigation from './navigation/react-example.tsx?raw'
import angularNavigation from './navigation/angular-example.html?raw'
import htmlNavigation from './navigation/html-example.html?raw'
import cssNavigation from './navigation/html-example.css?raw'
import jsNavigation from './navigation/html-example.js?raw'

import bladeTable from './table/blade-example.blade.php?raw'
import reactTable from './table/react-example.tsx?raw'
import angularTable from './table/angular-example.html?raw'
import htmlTable from './table/html-example.html?raw'
import cssTable from './table/html-example.css?raw'
import jsTable from './table/html-example.js?raw'

import bladeAppUI from './app-ui/blade-example.blade.php?raw'
import reactAppUI from './app-ui/react-example.tsx?raw'
import angularAppUI from './app-ui/angular-example.html?raw'
import htmlAppUI from './app-ui/html-example.html?raw'
import cssAppUI from './app-ui/html-example.css?raw'
import jsAppUI from './app-ui/html-example.js?raw'

export type ComponentSnippet = {
  blade?: string
  react: string
  angular?: string
  html: string
  css: string
  javascript?: string
}

export const COMPONENT_SNIPPETS: Record<string, ComponentSnippet> = {
  button: {
    blade: bladeButton,
    react: reactButton,
    angular: angularButton,
    html: htmlButton,
    css: cssButton,
    javascript: jsButton,
  },
  accordion: {
    blade: bladeAccordion,
    react: reactAccordion,
    angular: angularAccordion,
    html: htmlAccordion,
    css: cssAccordion,
    javascript: jsAccordion,
  },
  badge: {
    blade: bladeBadge,
    react: reactBadge,
    angular: angularBadge,
    html: htmlBadge,
    css: cssBadge,
    javascript: jsBadge,
  },
  alert: {
    blade: bladeAlert,
    react: reactAlert,
    angular: angularAlert,
    html: htmlAlert,
    css: cssAlert,
    javascript: jsAlert,
  },
  card: {
    blade: bladeCard,
    react: reactCard,
    angular: angularCard,
    html: htmlCard,
    css: cssCard,
    javascript: jsCard,
  },
  avatar: {
    blade: bladeAvatar,
    react: reactAvatar,
    angular: angularAvatar,
    html: htmlAvatar,
    css: cssAvatar,
    javascript: jsAvatar,
  },
  progress: {
    blade: bladeProgress,
    react: reactProgress,
    angular: angularProgress,
    html: htmlProgress,
    css: cssProgress,
    javascript: jsProgress,
  },
  form: {
    blade: bladeForm,
    react: reactForm,
    angular: angularForm,
    html: htmlForm,
    css: cssForm,
    javascript: jsForm,
  },
  modal: {
    blade: bladeModal,
    react: reactModal,
    angular: angularModal,
    html: htmlModal,
    css: cssModal,
    javascript: jsModal,
  },
  navigation: {
    blade: bladeNavigation,
    react: reactNavigation,
    angular: angularNavigation,
    html: htmlNavigation,
    css: cssNavigation,
    javascript: jsNavigation,
  },
  table: {
    blade: bladeTable,
    react: reactTable,
    angular: angularTable,
    html: htmlTable,
    css: cssTable,
    javascript: jsTable,
  },
  'app-ui': {
    blade: bladeAppUI,
    react: reactAppUI,
    angular: angularAppUI,
    html: htmlAppUI,
    css: cssAppUI,
    javascript: jsAppUI,
  },
}
