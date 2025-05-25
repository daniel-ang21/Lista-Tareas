// Funcion para agregar y eliminar las tareas

// Referencias
// const agregarBtn = document.getElementById("agregarBtn");
// const tareaInput = document.getElementById("tareaInput");
// const listaTareas = document.getElementById("listaTareas");

// // Función para agregar una tarea
// function agregarTarea() {
//   const textoTarea = tareaInput.value.trim();
//   if (textoTarea === "") return;

//   const li = document.createElement("li");
//   li.textContent = textoTarea;

//   const btnEliminar = document.createElement("span");
//   btnEliminar.textContent = "✖";
//   btnEliminar.classList.add("eliminar");

//   // Eliminar tarea al hacer clic
//   btnEliminar.addEventListener("click", () => {
//     li.remove();
//   });

//   li.appendChild(btnEliminar);
//   listaTareas.appendChild(li);

//   tareaInput.value = "";
//   tareaInput.focus();
// }

// // Evento al hacer clic en el botón
// agregarBtn.addEventListener("click", agregarTarea);

// // También puedes agregar tareas con Enter
// tareaInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") agregarTarea();
// });

// Agregar los datos al localStorage

// // Referencias
// const agregarBtn = document.getElementById("agregarBtn");
// const tareaInput = document.getElementById("tareaInput");
// const listaTareas = document.getElementById("listaTareas");

// // Obtener tareas guardadas al iniciar
// document.addEventListener("DOMContentLoaded", cargarTareasGuardadas);

// // Agregar tarea
// function agregarTarea() {
//   const textoTarea = tareaInput.value.trim();
//   if (textoTarea === "") return;

//   agregarTareaAlDOM(textoTarea);
//   guardarTarea(textoTarea);

//   tareaInput.value = "";
//   tareaInput.focus();
// }

// // Mostrar tarea en pantalla
// function agregarTareaAlDOM(textoTarea) {
//   const li = document.createElement("li");
//   li.textContent = textoTarea;

//   const btnEliminar = document.createElement("span");
//   btnEliminar.textContent = "✖";
//   btnEliminar.classList.add("eliminar");

//   // Eliminar tarea
//   btnEliminar.addEventListener("click", () => {
//     li.remove();
//     eliminarTarea(textoTarea);
//   });

//   li.appendChild(btnEliminar);
//   listaTareas.appendChild(li);
// }

// // Guardar tarea en localStorage
// function guardarTarea(tarea) {
//   const tareas = obtenerTareas();
//   tareas.push(tarea);
//   localStorage.setItem("tareas", JSON.stringify(tareas));
// }

// // Obtener tareas del localStorage
// function obtenerTareas() {
//   return JSON.parse(localStorage.getItem("tareas")) || [];
// }

// // Eliminar tarea del localStorage
// function eliminarTarea(tarea) {
//   let tareas = obtenerTareas();
//   tareas = tareas.filter((t) => t !== tarea);
//   localStorage.setItem("tareas", JSON.stringify(tareas));
// }

// // Cargar tareas guardadas
// function cargarTareasGuardadas() {
//   const tareas = obtenerTareas();
//   tareas.forEach((t) => agregarTareaAlDOM(t));
// }

// // Eventos
// agregarBtn.addEventListener("click", agregarTarea);
// tareaInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") agregarTarea();
// });

// Añadir el tachado de las tareas

const agregarBtn = document.getElementById("agregarBtn");
const tareaInput = document.getElementById("tareaInput");
const listaTareas = document.getElementById("listaTareas");

document.addEventListener("DOMContentLoaded", cargarTareasGuardadas);

function agregarTarea() {
  const textoTarea = tareaInput.value.trim();
  if (textoTarea === "") return;

  const tarea = { texto: textoTarea, completada: false };
  agregarTareaAlDOM(tarea);
  guardarTarea(tarea);

  tareaInput.value = "";
  tareaInput.focus();
}

function agregarTareaAlDOM(tarea) {
  const li = document.createElement("li");
  li.textContent = tarea.texto;

  if (tarea.completada) {
    li.classList.add("completada");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completada");
    tarea.completada = !tarea.completada;
    actualizarTarea(tarea);
  });

  const btnEliminar = document.createElement("span");
  btnEliminar.textContent = "✖";
  btnEliminar.classList.add("eliminar");

  btnEliminar.addEventListener("click", (e) => {
    e.stopPropagation(); // Para no marcar como completada al eliminar
    li.remove();
    eliminarTarea(tarea.texto);
  });

  li.appendChild(btnEliminar);
  listaTareas.appendChild(li);
}

function guardarTarea(tarea) {
  const tareas = obtenerTareas();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function actualizarTarea(tareaActualizada) {
  const tareas = obtenerTareas().map((t) => {
    if (t.texto === tareaActualizada.texto) {
      return tareaActualizada;
    }
    return t;
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function eliminarTarea(texto) {
  let tareas = obtenerTareas().filter((t) => t.texto !== texto);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerTareas() {
  return JSON.parse(localStorage.getItem("tareas")) || [];
}

function cargarTareasGuardadas() {
  const tareas = obtenerTareas();
  tareas.forEach((t) => agregarTareaAlDOM(t));
}

agregarBtn.addEventListener("click", agregarTarea);
tareaInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") agregarTarea();
});
