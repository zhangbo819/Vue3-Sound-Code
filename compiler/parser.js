// 输入 <p>Vue</p>
// 输出 
// [
//   { type: 'tag', name: 'p' },
//   { type: 'text', name: 'Vue' },
//   { type: 'tagEnd', name: 'p' }
// ]

// 判断是否是字母
function isAlpha(char) {
  return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

const State = {
  initial: 1,    // 初始状态
  tagOpen: 2,    // 标签开始
  tagName: 3,    // 标签开始名称
  text: 4,       // 文字
  tagEnd: 5,     // 标签结束
  tagEndName: 6  // 标签结束名称
}

function tokenzie(str) {
  let currentState = State.initial

  const chars = []

  const tokens = []

  while (str) {
    const char = str[0]

    switch (currentState) {
      case State.initial:
        if (char === '<') {
          currentState = State.tagOpen
          str = str.slice(1)
        } else if (isAlpha(char)) {
          currentState = State.text
          chars.push(char)
          str = str.slice(1)
        }
        break
      case State.tagOpen:
        if (isAlpha(char)) {
          currentState = State.tagName
          chars.push(char)
          str = str.slice(1)
        } else if (char === '/') {
          currentState = State.tagEnd
          str = str.slice(1)
        }
        break
      case State.tagName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tag',
            name: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
      case State.text:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '<') {
          currentState = State.tagOpen
          tokens.push({
            type: 'text',
            content: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break

      case State.tagEnd:
        if (isAlpha(char)) {
          currentState = State.tagEndName
          chars.push(char)
          str = str.slice(1)
        }
        break

      case State.tagEndName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tagEnd',
            name: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
    }
  }

  return tokens
}

console.log('tokenzie("<p>Vue</p>")', tokenzie("<p>Vue</p>"))
console.log('tokenzie("<p><span>a</span><span>b</span></p>")', tokenzie("<p><span>a</span><span>b</span></p>"))