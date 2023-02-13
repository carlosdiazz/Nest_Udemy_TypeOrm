import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
  const url = 'http://localhost:3000/socket.io/socket.io.js';
  const manager = new Manager(url, {
    extraHeaders: {
      hola: 'mundo',
      authentication: token,
    },
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListeners();
};

const addListeners = () => {
  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUl = document.querySelector('#clients-ul')!;
  //TODO #clients-ul

  const message_form =
    document.querySelector<HTMLInputElement>('#message-form')!;
  const message_input =
    document.querySelector<HTMLInputElement>('#message-input')!;

  const messages_ul = document.querySelector<HTMLUListElement>('#messages-ul')!;

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Connected';
    //console.log('Connected');
  });

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Disconnect';
    //console.log('Disconnect');
  });

  socket.on('clients-updated', (clients: string[]) => {
    //console.log({ clients });
    let clientsHtml = '';
    clients.forEach((clienId) => {
      clientsHtml += `<li>${clienId}</li>`;
    });
    clientsUl.innerHTML = clientsHtml;
  });

  message_form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message_input.value.trim().length <= 0) return;

    socket.emit('message-from-client', {
      message: message_input.value,
    });
    message_input.value = '';
  });

  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
        <li>
          <strong>${payload.fullName}</strong>
          <span>${payload.message}</span>
        </li>
      `;
      const li = document.createElement('li');
      li.innerHTML = newMessage;
      messages_ul.append(li);
    },
  );
};
