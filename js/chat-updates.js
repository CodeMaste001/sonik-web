// chat-updates.js - Feed de actualizaciones tipo chat para Sonik
const avatarUrl = 'https://media.discordapp.net/attachments/1356038487861755965/1409662019279388695/IMG_4071.png?ex=68ae318f&is=68ace00f&hm=a43c06c7ae49c863bd1af1756032b4035a6b4bbff32df538097db38810c9c166&=&format=webp&quality=lossless&width=420&height=438';
const author = 'Alex';
const updates = [
  { fecha: '2025-08-25 18:30', texto: 'Agregamos el modo radio con bloques de 3 canciones por artista.' },
  { fecha: '2025-08-20 15:10', texto: 'Integración de los podcasts de Axelinn Studios lista en la app.' },
  { fecha: '2025-08-15 12:00', texto: 'Mejoramos el diseño del reproductor y las playlists.' },
  { fecha: '2025-08-10 09:45', texto: 'Se añadió búsqueda global de artistas.' },
  { fecha: '2025-08-05 20:00', texto: 'Discord Rich Presence ya disponible para mostrar lo que escuchas.' },
  { fecha: '2025-08-01 17:20', texto: 'Animaciones suaves y carga progresiva de imágenes implementadas.' },
  { fecha: '2025-07-28 14:00', texto: 'Mejoras generales de rendimiento y optimización para móviles.' }
];

let shown = 0;
const perPage = 4;

function renderMessages() {
  const feed = document.getElementById('chat-feed');
  feed.innerHTML = '';
  const gradients = [
    'linear-gradient(90deg, #1ed760 20%, #3a8dde 100%)',
    'linear-gradient(90deg, #f857a6 0%, #ffb347 100%)',
    'linear-gradient(90deg, #3a8dde 0%, #1ed760 100%)',
    'linear-gradient(90deg, #ffb347 0%, #f857a6 100%)',
    'linear-gradient(90deg, #1ed760 0%, #f857a6 100%)',
    'linear-gradient(90deg, #3a8dde 0%, #ffb347 100%)',
    'linear-gradient(90deg, #f857a6 0%, #3a8dde 100%)'
  ];
  const toShow = updates.slice(shown, shown + perPage);
  toShow.forEach((msg, i) => {  // i is the index of the element in toShow array
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.style.setProperty('--bubble-gradient', gradients[(shown + i) % gradients.length]);
    div.innerHTML = `
      <img src="${avatarUrl}" alt="Alex" class="avatar" loading="lazy">
      <div class="msg-content">
        <div class="msg-author">${author}</div>
        <div class="msg-date">${msg.fecha}</div>
        <div class="msg-text">${msg.texto}</div>
      </div>
    `;
    feed.appendChild(div);
  });
}

function seeMore() {
  if (shown + perPage < updates.length) {
    shown += perPage;
    renderMessages();
  }
}

document.getElementById('ver-mas').addEventListener('click', seeMore);

// Inicializar
renderMessages();
