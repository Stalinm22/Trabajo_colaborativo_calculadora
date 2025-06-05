// Selección de la pantalla por id y obtenemos el elemento 
const pantalla = document.getElementById('pantalla');

// Variables para las operaciones
let operacion = '';
let nuevaOperacion = false;

// Función para actualizar la pantalla de nuetro trabajo 
function actualizarPantalla(valor) {
  if (pantalla.textContent === '0' || nuevaOperacion) {
    pantalla.textContent = valor;
    nuevaOperacion = false;
  } else {
    pantalla.textContent += valor;
  }
}

// Función de js para calcular el resultado
function calcularResultado() {
  try {
    const expresion = pantalla.textContent
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/,/g, '.'); // Reemplazar coma por punto para decimales para evitar errors al poner punto o coma

    const resultado = eval(expresion);
    pantalla.textContent = resultado;
    nuevaOperacion = true;
  } catch {
    pantalla.textContent = 'Error';
  }
}

// creamos la función para limpiar la pantalla
function limpiarPantalla() {
  pantalla.textContent = '0';
  operacion = '';
  nuevaOperacion = false;
}

// Función para cambiar el signo de +/-
function cambiarSigno() {
  let valor = pantalla.textContent;
  if (valor !== '0') {
    if (valor.startsWith('-')) {
      pantalla.textContent = valor.slice(1);
    } else {
      pantalla.textContent = '-' + valor;
    }
  }
}

// Función para calcular el porcentaje %
function calcularPorcentaje() {
  pantalla.textContent = parseFloat(pantalla.textContent) / 100;
  nuevaOperacion = true;
}

// Escuchamos todos los botones a lo que el usuario precione los diferentes numeros
document.querySelectorAll('button').forEach(boton => {
  boton.addEventListener('click', () => {
    const valor = boton.textContent;

    if (!isNaN(valor)) {
      // Si es un número
      actualizarPantalla(valor);
    } else if (valor === 'C') {
      limpiarPantalla();
    } else if (valor === ',') {
      if (!pantalla.textContent.includes(',')) {
        actualizarPantalla(',');
      }
    } else if (valor === '=') {
      calcularResultado();
    } else if (valor === '+/-') {
      cambiarSigno();
    } else if (valor === '%') {
      calcularPorcentaje();
    } else {
      // Operadores (+, -, ×, ÷)
      actualizarPantalla(valor);
    }
  });
});
