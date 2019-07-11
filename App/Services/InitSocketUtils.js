import SocketUtils from './SocketUtils'

export default function InitSocketUtils() {
  SocketUtils.connect()
  SocketUtils.handleOnConnect()

  SocketUtils.handleOnLobbyJoin()
  SocketUtils.handleOnLobbyLeave()

  SocketUtils.handleOnRoomJoin()
  SocketUtils.handleOnRoomLeave()

  SocketUtils.handleOnRoomSendHeart()
  SocketUtils.handleOnRoomSendMessage()
  SocketUtils.handleOnRoomChangedLiveStatus()
  SocketUtils.handleOnRoomNotReady()
}
