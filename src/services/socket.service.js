import io from 'socket.io-client';

let socket = null;

export default {
  /**
   * Connect socket
   */
  connect() {
    socket = io(process.env.REACT_APP_ROOT);
  },

  /**
   * Join room to listen for city information change
   * @param {string} cityId
   */
  listenCity(cityId, callback) {
    socket.emit('room', cityId);

    // When city-info event is emitted
    socket.on(String(cityId), (data) => {
      callback(data);
    });
  },

  /**
   * Leave room
   * @param {string} cityId
   */
  stopListening(cityId) {
    if (socket) {
      socket.emit('leaveRoom', cityId);
    }
  },

  /**
   * Disconnect socket
   */
  disconnect() {
    socket.disconnect();
    socket = null;
  },
};
