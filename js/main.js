document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');

    const updates = [
        {
            date: '24 de Agosto, 2025',
            text: '¡El desarrollo de Sonik ha comenzado! Estamos construyendo la próxima generación de comunicación. ¡Prepárense para algo grande!'
        },
        {
            date: '15 de Septiembre, 2025',
            text: 'Hemos finalizado la fase de diseño del núcleo. La interfaz será intuitiva, moderna y potente. El minimalismo premium es nuestro lema.'
        },
        {
            date: '10 de Octubre, 2025',
            text: 'Las primeras pruebas internas de rendimiento son un éxito. La velocidad y la eficiencia están superando nuestras expectativas.'
        },
        {
            date: '05 de Noviembre, 2025',
            text: '¡Anuncio oficial de la fecha de lanzamiento! Marquen sus calendarios, el futuro llega a finales de año.'
        }
    ];

    const avatarUrl = 'https://media.discordapp.net/attachments/1356038487861755965/1409662019279388695/IMG_4071.png?ex=68ae318f&is=68ace00f&hm=a43c06c7ae49c863bd1af1756032b4035a6b4bbff32df538097db38810c9c166&=&format=webp&quality=lossless&width=420&height=438';

    const displayMessages = () => {
        updates.forEach((update, index) => {
            setTimeout(() => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.innerHTML = `
                    <img src="${avatarUrl}" alt="Avatar" class="avatar">
                    <div class="message-content">
                        <p class="message-text">${update.text}</p>
                        <p class="message-date">${update.date}</p>
                    </div>
                `;
                chatContainer.appendChild(messageElement);
            }, index * 400); // Stagger the animation
        });
    };

    const updatesSection = document.querySelector('#updates');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                displayMessages();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(updatesSection);
});