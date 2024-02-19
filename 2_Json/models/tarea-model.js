const fs = require('fs') // Node: Interactuar con archivos del sistema
const path = require('path') // Node: Para trabajar con la dirección de directorios y archivos

// Crear modelo de tareas
class TareaModel {
  // Método estático
  static getTareas() {
    // Lee de forma syncrona todo el contenido de un archivo, requiere dos parámetros
    const data = fs.readFileSync(
      path.join(__dirname, '../data/tareas.json'), // Dirección del archivo
      'utf8'
    )
    return JSON.parse(data) // Enviar información tipo objeto
  }
}

// CommonJS export
module.exports = TareaModel
