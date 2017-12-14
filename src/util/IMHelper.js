import ChatRoom from '../../static/NIM_Web_Chatroom_v3.8.0.js'

export const NEIMConfig = {
  appKey: '3b95e461fd9bbc17dc72e638d5a5fcf8'
}

export const getInstance = ({
  account = '',
  token = '',
  chatroomId = '',
  chatroomAddresses = [],
  onconnect = () => {},
  onerror = () => {},
  onwillreconnect = () => {},
  ondisconnect = () => {},
  onmsgs = () => {}
}) => {
  if (window.chatroomInstance) {
    window.chatroomInstance.disconnect()
  }
  window.chatroomInstance = ChatRoom.getInstance({
    appKey: NEIMConfig.appKey,
    account,
    token,
    chatroomId,
    chatroomAddresses,
    onconnect,
    onerror,
    onwillreconnect,
    ondisconnect,
    onmsgs
  })
}
