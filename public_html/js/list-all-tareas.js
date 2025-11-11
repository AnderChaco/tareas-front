const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const listarTareas = async () => {
    //const url = 'https://jsonplaceholder.typicode.com/todos';
    const url = 'http://localhost:8080/api/tareas';
    return await fetchData(url);
}

const mostrarTareasEnLista = (tareas) => {
    const listGroup = document.getElementById('tareasListGroup');
    
    if (!tareas || tareas.length === 0) {
        listGroup.innerHTML = `
            <li class="list-group-item text-center text-muted">
                No hay tareas disponibles
            </li>
        `;
        return;
    }
    
    listGroup.innerHTML = '';
    
    tareas.forEach((tarea) => {
        const listItem = document.createElement('li');
        const isCompleted = tarea.completed || tarea.realizada || false;
        
        listItem.className = `list-group-item ${isCompleted ? 'tarea-completada' : ''}`;
        
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" 
                    ${isCompleted ? 'checked' : ''} 
                    onchange="toggleTarea(${tarea.id}, this.checked)" 
                    id="checkbox-${tarea.id}">
                <label class="form-check-label flex-grow-1 ${isCompleted ? 'tarea-completada' : ''}">
                    ${tarea.title || tarea.descripcion || 'Sin descripción'}
                </label>
                <button class="btn btn-warning btn-sm me-2" onclick="editarTarea(${tarea.id})">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="borrarTarea(${tarea.id})">
                    Borrar
                </button>
            </div>
        `;
        
        listGroup.appendChild(listItem);
    });
};

// Funciones para las acciones de las tareas
const toggleTarea = (id, completed) => {
    console.log(`Tarea ${id} marcada como ${completed ? 'completada' : 'pendiente'}`);
    
    // Actualizar inmediatamente la interfaz usando el ID del checkbox
    const targetCheckbox = document.getElementById(`checkbox-${id}`);
    
    if (targetCheckbox) {
        const listItem = targetCheckbox.closest('li');
        const label = listItem.querySelector('label');
        
        if (completed) {
            // Marcar como completada
            listItem.classList.add('tarea-completada');
            label.classList.add('tarea-completada');
        } else {
            // Marcar como pendiente
            listItem.classList.remove('tarea-completada');
            label.classList.remove('tarea-completada');
        }
    }
    
    // Aquí puedes agregar la lógica para actualizar el estado en el servidor
    const url = `http://localhost:8080/api/tareas/${id}/realizar`; // Ajusta la URL según tu API
    //const method = completed ? 'PUT' : 'DELETE'; // Ejemplo de métodos, ajustar según API
    const method = 'PUT'; // Suponiendo que siempre usamos PUT para actualizar el estado

    fetch(url, {    
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: completed }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }
        return response.json();
    })
    .then(data => {
        console.log('Tarea actualizada:', data);
        // Aquí puedes agregar lógica para actualizar la UI si es necesario

        // Recargar la lista de tareas y mostrar las completadas subrayadas
        listarTareas()
            .then(tareas => mostrarTareasEnLista(tareas))
            .catch(error => console.error('Error al recargar tareas:', error));
        
    })
    .catch(error => {
        console.error('Error al actualizar la tarea:', error);
    });
};

const editarTarea = (id) => {
    console.log(`Editar tarea ${id}`);
    // Aquí puedes agregar la lógica para editar la tarea
};

const borrarTarea = (id) => {
    console.log(`Borrar tarea ${id}`);
    // Aquí puedes agregar la lógica para borrar la tarea
};

// Call the function and display the results
document.addEventListener('DOMContentLoaded', function() {
    listarTareas()
        .then(tareas => {
            console.log('Lista de tareas:');
            console.log(JSON.stringify(tareas, null, 2));
            mostrarTareasEnLista(tareas);
        })
        .catch(error => {
            console.error('Error al listar tareas:', error);
            const listGroup = document.getElementById('tareasListGroup');
            listGroup.innerHTML = `
                <li class="list-group-item text-center text-danger">
                    Error al cargar las tareas. Por favor, intente más tarde.
                </li>
            `;
        });
});

// Función alternativa para casos en que DOMContentLoaded ya se ejecutó
if (document.readyState === 'loading') {
    // El DOM aún se está cargando, esperar al evento
} else {
    // El DOM ya está listo, ejecutar inmediatamente
    listarTareas()
        .then(tareas => {
            console.log('Lista de tareas:');
            console.log(JSON.stringify(tareas, null, 2));
            mostrarTareasEnLista(tareas);
        })
        .catch(error => {
            console.error('Error al listar tareas:', error);
            const listGroup = document.getElementById('tareasListGroup');
            listGroup.innerHTML = `
                <li class="list-group-item text-center text-danger">
                    Error al cargar las tareas. Por favor, intente más tarde.
                </li>
            `;
        });
}