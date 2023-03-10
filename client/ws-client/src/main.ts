import './style.css';
import typescriptLogo from './typescript.svg';
import { setupCounter } from './counter';
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>
    <br>

    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>


    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
//connectToServer();
const jwttoken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnconnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnconnect.addEventListener('click', () => {
  if (jwttoken.value.trim().length <= 0) return alert('Enter a Valid JWT');
  connectToServer(jwttoken.value.trim());
});
