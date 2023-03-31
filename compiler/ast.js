import { tokenzie } from './tokenzie.js'

function parse(str) {
  const tokens = tokenzie(str)
  console.log(tokens)

  const root = {
    type: 'Root',
    children: []
  }

  const elementStack = [root]

  while (tokens.length) {
    const parent = elementStack[elementStack.length - 1]

    const t = tokens[0]

    switch (t.type) {
      case 'tag':
        const elementNode = {
          type: "Element",
          tag: t.name,
          children: []
        }

        parent.children.push(elementNode)

        elementStack.push(elementNode)
        break
      case "text":
        const textNode = {
          type: 'Text',
          content: t.content
        }

        parent.children.push(textNode)
        break
      case "tagEnd":

        elementStack.pop()
        break
    }

    tokens.shift()
  }

  console.log(JSON.stringify(root, null, 2))

  return root
}

parse(`<p><span>a</span><span>b</span></p>`)