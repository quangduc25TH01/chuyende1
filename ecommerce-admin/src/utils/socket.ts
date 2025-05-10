import { io } from 'socket.io-client';
import config from '../../src/config';

const socket = io(config.apiServerUrl, {
  transports: ['websocket', 'polling'],
});

export default socket;
