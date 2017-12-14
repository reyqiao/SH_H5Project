export const faceToImg = content => {
  return content.replace(/\[([0-9a-f]{4,5})\]/g, (match, group) => {
    if (group.length < 6) {
      return `<img src="https://i0.niuguwang.com/emoji/emoji_${group}.png">`
    }
    return match
  })
}

/**
 * 将内容转换为可以发送的内容
 */
export const contentToSend = content => {
  let result = content.replace(/&nbsp;/g, ' ').trim()
  result = result.replace(/<br>/g, '\n')
  result = result.replace(
    /<img[^>]+?([a-zA-Z0-9]{4,5}(?=\.png))[^>]*>/g,
    (match, key) => {
      return `[${key}]`
    }
  )
  return result
}

/**
 * 限制性行为
 */
export const limitBehavior = () => {
  document.body.addEventListener(
    'touchmove',
    event => {
      if (!document.querySelector('.content-wrap').contains(event.target)) {
        event.preventDefault()
      }
    },
    false
  )
  document.body.addEventListener('touchstart', (event) => {
    if (!document.querySelector('.send-box-wrap').contains(event.target)) {
      document.querySelector('#txtMsg').blur()
    }
  }, false)
}
