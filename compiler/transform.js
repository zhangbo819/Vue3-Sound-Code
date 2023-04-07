import { parse } from './parse.js'

function dump(node, indent = 0) {
  const type = node.type
  const desc = node.type === 'Root' ? "" : node.type === 'Element' ? node.tag : node.content

  // 打印节点的类型和描述信息
  console.log(`${'-'.repeat(indent)}${type}:${desc}`)

  // 递归打印子节点
  if (node.children) {
    node.children.forEach(n => dump(n, indent + 2))
  }
}


function traverseNode(ast, context) {
  const currentNode = ast

  // 插件化
  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    transforms[i](currentNode, context)
  }

  const children = currentNode.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      traverseNode(children[i], context)
    }
  }
}


function transformElement(node) {
  if (node.type === 'Element' && node.tag === 'p') {
    node.tag = 'h1'
  }
}

function transformText(node) {
  if (node.type === 'Text') {
    node.content = node.content.repeat(2)
  }
}

// 将 ast 进行转换/增强
export function transform(ast) {
  const context = {
    nodeTransforms: [
      transformElement,
      transformText
    ]
  }

  traverseNode(ast, context)
  console.log(dump(ast))
}

const ast = parse(`<p><span>a</span><span>b</span></p>`)
transform(ast)