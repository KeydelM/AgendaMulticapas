document.addEventListener('DOMContentLoaded', () => {
    // Cargar contactos cuando la página se cargue
    loadContacts();

    // Manejar el formulario para agregar un nuevo contacto
    document.getElementById('agregarContacto').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        // Verificar si los campos están vacíos
        if (nombre.trim() === '' || apellido.trim() === '' || telefono.trim() === '') {
            alert("Por favor, rellene todos los campos.");
            return;
        }

        // Agregar el contacto
        addContact({ nombre, apellido, telefono });
    });
});

// Función para cargar contactos
function loadContacts() {
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const contactList = document.getElementById('contacts');
        contactList.innerHTML = '';  // Limpiar la lista de contactos

        // Si no hay contactos, mostrar un mensaje
        if (data.length === 0) {
            contactList.innerHTML = '<li class="list-group-item">No hay contactos disponibles.</li>';
        } else {
            // Añadir cada contacto a la lista
            data.forEach(contact => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = `${contact.nombre} ${contact.apellido} - Tel: ${contact.telefono}`;
                contactList.appendChild(li);
            });
        }
    })
    .catch(error => {
        console.error('Error al cargar los contactos:', error);
        const contactList = document.getElementById('contacts');
        contactList.innerHTML = `<li class="list-group-item list-group-item-danger">Error al cargar los contactos: ${error.message}</li>`;
    });
}

// Función para agregar un nuevo contacto
// Función para agregar un nuevo contacto
function addContact(contact) {
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(contact)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud POST: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Contacto agregado:', data);
        alert('Contacto agregado con éxito');
        // Limpiar el formulario
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';
        // Recargar la lista de contactos
        loadContacts();
    })
    .catch(error => {
        console.error('Error al agregar el contacto:', error);
        alert(`Error al agregar el contacto: ${error.message}`);
    });
}