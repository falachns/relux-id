import { COMPONENT_SNIPPETS } from '../../data/component-snippets'
import { CodeTabs } from './CodeTabs'

export function ComponentCode({
  component,
  aiPromptContent,
}: {
  component: string
  aiPromptContent?: string
}) {
  const snippet = COMPONENT_SNIPPETS[component]
  if (!snippet) return null

  return (
    <CodeTabs
      componentName={component}
      snippets={{
        blade: snippet.blade,
        react: snippet.react,
        angular: snippet.angular,
        css: snippet.html,
      }}
      preview={{
        html: snippet.html,
        css: snippet.css,
        javascript: snippet.javascript,
      }}
      aiPromptContent={aiPromptContent}
    />
  )
}
