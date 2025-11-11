# Lista de Tareas - Proyecto Bootstrap

Este es un proyecto de lista de tareas (To-Do List) desarrollado con Bootstrap 5 y JavaScript vanilla que consume una API REST.

## 📋 Características

- Interfaz responsive con Bootstrap 5
- Carga dinámica de tareas desde una API
- Visualización de tareas en lista con formato de Bootstrap
- Funciones para marcar tareas como completadas
- Botones para editar y borrar tareas
- Modal para crear nuevas tareas
- Manejo de estados de carga y errores

## 🚀 Configuración e Instalación

### Requisitos Previos

- Node.js instalado (para el servidor local)
- Una API backend corriendo en `http://localhost:8080/api/tareas`

### Instalación

1. Clone o descargue este repositorio
2. Navegue al directorio del proyecto

### Ejecutar el Proyecto

Para evitar problemas de CORS, debe servir los archivos HTML a través de un servidor web local.

#### Opción 1: Usando http-server (Recomendado)

```powershell
cd public_html
npx http-server -p 3000
```

Luego abra su navegador en: `http://localhost:3000`

#### Opción 2: Usando Python

```powershell
cd public_html
python -m http.server 3000
```

Luego abra su navegador en: `http://localhost:3000`

#### Opción 3: VS Code Live Server Extension

1. Instale la extensión "Live Server" en VS Code
2. Haga clic derecho en `index.html`
3. Seleccione "Open with Live Server"

## 📁 Estructura del Proyecto

```
EjemploBS/
├── public_html/
│   ├── index.html              # Página principal
│   ├── css/                    # Archivos CSS
│   │   ├── bootstrap.min.css   # Bootstrap CSS
│   │   ├── custom-styles.css   # Estilos personalizados para tareas completadas
│   │   └── ...                 # Otros archivos CSS de Bootstrap
│   ├── js/
│   │   ├── script.js           # Funciones auxiliares (modal)
│   │   ├── list-all-tareas.js  # Lógica para cargar y mostrar tareas
│   │   └── vendors/
│   │       └── bootstrap.bundle.min.js
│   └── img/                    # Imágenes
└── test/
```

## 🔧 Configuración de la API

El proyecto está configurado para consumir una API REST en:

```
http://localhost:8080/api/tareas
```

### Formato de Datos Esperado

La API debe devolver un array de objetos con la siguiente estructura:

```json
[
  {
    "id": 1,
    "title": "Descripción de la tarea",
    "completed": false
  },
  {
    "id": 2,
    "title": "Otra tarea",
    "completed": true
  }
]
```

**Nota:** El código también acepta el campo `descripcion` en lugar de `title`.

### Configuración CORS en el Backend

Para que la aplicación funcione correctamente, su backend debe incluir los siguientes headers CORS:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 💻 Funcionalidades Implementadas

### Carga de Tareas

Las tareas se cargan automáticamente cuando se abre la página mediante una petición GET a la API.

### Visualización

- Las tareas se muestran en una lista (`<ul>`) con estilo Bootstrap
- Cada tarea incluye:
  - Checkbox para marcar como completada
  - Descripción de la tarea
  - Botón de "Editar" (amarillo)
  - Botón de "Borrar" (rojo)
- Las tareas completadas se muestran con texto tachado y color gris

### Estados de la Aplicación

- **Cargando**: Muestra un spinner mientras se obtienen los datos
- **Sin tareas**: Mensaje informativo cuando no hay tareas
- **Error**: Mensaje de error cuando falla la conexión con la API

## 🎯 Funcionalidades de Visualización de Tareas Completadas

### 1. Visualización de tareas completadas

- ✅ **Checkbox marcado**: Las tareas completadas muestran automáticamente el checkbox marcado
- ✅ **Texto tachado**: Línea atravesada en el texto de la tarea completada
- ✅ **Color gris atenuado**: El texto de las tareas completadas se muestra en color gris
- ✅ **Fondo diferenciado**: Fondo ligeramente diferente para tareas completadas
- ✅ **Borde verde**: Indicador visual con borde verde en el lado izquierdo

### 2. Interactividad mejorada

- ✅ **Actualización instantánea**: Al marcar/desmarcar una tarea, el cambio visual es inmediato
- ✅ **Transiciones suaves**: Efectos CSS para cambios de estado más elegantes
- ✅ **Feedback visual**: Respuesta inmediata sin esperar confirmación del servidor
- ✅ **Manejo de errores**: Si falla la actualización en el servidor, se revierten los cambios visuales

### 3. Estilos personalizados

- ✅ **Archivo CSS separado**: `custom-styles.css` con estilos específicos para tareas completadas
- ✅ **Clases CSS específicas**: `.tarea-completada` para elementos completados
- ✅ **Animaciones suaves**: Transiciones de 0.3s para cambios de estado
- ✅ **Checkbox destacado**: Color verde para checkboxes marcados

### 4. Mejoras en el código

- ✅ **Función `toggleTarea` optimizada**: Mejor manejo del cambio de estado
- ✅ **IDs únicos**: Cada checkbox tiene un ID único para mejor control
- ✅ **Carga correcta**: Inicialización adecuada al cargar la página
- ✅ **Compatibilidad**: Funciona con propiedades `completed` y `realizada`

### Cómo funciona la visualización

1. **Al cargar la página**: Las tareas que tengan `completed: true` o `realizada: true` aparecerán automáticamente marcadas con todos los estilos visuales aplicados

2. **Al hacer clic en checkbox**: 
   - La interfaz se actualiza inmediatamente
   - Se aplican/quitan las clases CSS correspondientes
   - Se envía la actualización al servidor en segundo plano

3. **Indicadores visuales activos**:
   - Texto tachado con `text-decoration: line-through`
   - Color gris atenuado con `color: #6c757d`
   - Opacidad reducida al 70%
   - Fondo de color `#f8f9fa`
   - Borde izquierdo verde de 4px

### Estructura CSS implementada

```css
/* Estilo principal para tareas completadas */
.tarea-completada {
    text-decoration: line-through !important;
    color: #6c757d !important;
    opacity: 0.7;
}

/* Efecto en el contenedor de la tarea */
.list-group-item.tarea-completada {
    background-color: #f8f9fa;
    border-left: 4px solid #28a745;
}

/* Transiciones suaves */
.form-check-label {
    transition: all 0.3s ease;
}
```

## 📝 Archivos Principales

### `index.html`

Contiene la estructura HTML con:
- Barra de navegación con logo
- Card para mostrar la lista de tareas
- Modal para agregar nuevas tareas
- Referencias a los archivos CSS y JS

### `js/list-all-tareas.js`

Contiene la lógica principal:

- `fetchData(url)`: Función para hacer peticiones HTTP
- `listarTareas()`: Obtiene las tareas de la API
- `mostrarTareasEnLista(tareas)`: Renderiza las tareas en el DOM
- `toggleTarea(id, completed)`: Marca/desmarca tareas como completadas
- `editarTarea(id)`: Función para editar tareas (por implementar)
- `borrarTarea(id)`: Función para borrar tareas (por implementar)

### `js/script.js`

Contiene funciones auxiliares:
- `nuevaTarea()`: Abre el modal para crear una nueva tarea

### `css/custom-styles.css`

Contiene estilos personalizados para:
- `.tarea-completada`: Estilos para tareas marcadas como completadas
- `.list-group-item.tarea-completada`: Estilos para el contenedor de tareas completadas  
- `.form-check-label`: Transiciones suaves para cambios de estado
- `.form-check-input:checked`: Estilos para checkboxes marcados

## 🔄 Cambios Aplicados

### Modificaciones en el HTML

1. Se agregó `id="tareasListGroup"` al elemento `<ul>` para poder manipularlo dinámicamente
2. Se reemplazaron las tareas estáticas por un spinner de carga inicial
3. La lista ahora se llena dinámicamente con JavaScript

### Modificaciones en el JavaScript

1. Se creó la función `fetchData()` para manejar peticiones HTTP
2. Se implementó `listarTareas()` para obtener datos de la API
3. Se creó `mostrarTareasEnLista()` para renderizar las tareas dinámicamente
4. Se agregaron funciones placeholder para futuras funcionalidades (editar, borrar, toggle)
5. Se implementó manejo de errores con mensajes visuales en la interfaz

## 🛠️ Problemas Comunes y Soluciones

### Error CORS

**Problema**: "Access to fetch at 'http://localhost:8080/api/tareas' from origin 'null' has been blocked by CORS policy"

**Solución**: 
- No abra el archivo HTML directamente (file://)
- Use un servidor web local (http-server, Python server, o Live Server)
- Configure CORS correctamente en su backend

### API no responde

**Problema**: Error al cargar las tareas

**Solución**:
- Verifique que su backend esté corriendo en `http://localhost:8080`
- Verifique que el endpoint `/api/tareas` esté disponible
- Revise la consola del navegador para más detalles

## 📚 Tecnologías Utilizadas

- **HTML5**: Estructura de la página
- **CSS**: Bootstrap 5.x para estilos
- **JavaScript**: Vanilla JS (ES6+) para la lógica
- **Bootstrap 5**: Framework CSS para diseño responsive
- **Fetch API**: Para peticiones HTTP asíncronas

## 🚧 Funcionalidades Pendientes

Las siguientes funciones están definidas pero requieren implementación completa:

- [ ] `toggleTarea()`: Actualizar estado de tarea en el backend
- [ ] `editarTarea()`: Editar descripción de una tarea existente
- [ ] `borrarTarea()`: Eliminar una tarea del backend
- [ ] Guardar nueva tarea desde el modal

## 📄 Licencia

Este es un proyecto de ejemplo con fines educativos.

## 👤 Autor

Proyecto desarrollado como ejemplo de integración frontend-backend con Bootstrap.

---

**Última actualización**: 11 de noviembre de 2025

**Funcionalidades añadidas en esta versión**:
- Sistema completo de visualización para tareas completadas
- Estilos CSS personalizados con transiciones suaves
- Mejoras en la interactividad y feedback visual
- Compatibilidad mejorada con diferentes formatos de datos de la API
