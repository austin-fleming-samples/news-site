export const ptToPlain = blocks => {
  if (!blocks) return ''

  return blocks.map(block => block.children.map(child => child.text).join('')).join(' ')
}
