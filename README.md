# 📋 Simple Task Manager - SAPUI5 Application

Este proyecto es una aplicación desarrollada con **SAPUI5** que permite gestionar tareas de forma sencilla, siguiendo las mejores prácticas Fiori y empleando arquitectura MVC, OData y componentes inteligentes.

La aplicación fue construida como parte de una prueba técnica para evaluar habilidades en SAPUI5, estructura de proyectos, mock server, navegación y control de vistas, manejo de modelos, y diseño Fiori.

---

## ✅ Funcionalidades principales

- 📄 **Lista de tareas** visualizadas usando `SmartForm`
- 🧩 **Visualización de detalle** por tarea individual
- 🆕 Creación simulada de tareas
- ✏️ Edición de campos: título, descripción, estado
- ❌ Eliminación lógica simulada (con lógica futura)
- 🔁 Navegación entre vistas con `Routing`
- 📦 Datos simulados desde `MockServer` (sin backend real)
- 📐 Interfaz adaptable, responsive y Fiori-compliant

---

## 🛠️ Tecnologías y herramientas usadas

| Recurso                      | Uso                                           |
|-----------------------------|-----------------------------------------------|
| SAPUI5 (OpenUI5)            | Framework principal                          |
| SAP Business Application Studio | Entorno de desarrollo                        |
| OData V2 (MockServer)       | Simulación de servicios y operaciones CRUD   |
| JSON & Metadata.xml         | Datos y definición de modelo OData           |
| SmartForm & SmartField      | Controles inteligentes Fiori                 |
| Routing                     | Navegación entre vistas                      |
| Git                         | Control de versiones                         |

---

---

## 📡 Simulación con MockServer

- Se utiliza `MockServer` para simular una API REST OData V2
- Los datos se generan automáticamente desde `metadata.xml`
- No se requiere archivo `Tasks.json`, aunque puede usarse si se desea
- Se simula el EntitySet: `/Tasks`

---

## 🧪 Testing manual

1. Ejecutar la app desde **flpSandbox.html**
2. Visualizar el SmartForm con los campos:
   - ID
   - Título
   - Descripción
   - Estado
3. Confirmar que los datos se muestran correctamente desde el `MockServer`

---

## 🚀 Cómo correr el proyecto localmente

1. Clonar el repositorio
2. Abrir en SAP Business Application Studio
3. Ejecutar con Fiori Preview (`flpSandbox.html`)
4. Asegurarse de que el `MockServer` esté iniciado correctamente

---

## 📌 Requisitos cumplidos del enunciado

- ✔️ Proyecto SAPUI5 MVC en BTP
- ✔️ Listado y detalle de tareas
- ✔️ Agregado, edición y borrado simulado de tareas
- ✔️ Datos gestionados vía OData Mock (sin backend real)
- ✔️ Componentes Fiori (SmartForm, SmartField)
- ✔️ Responsive y diseño limpio
- ✔️ Manejo de errores y mensajes de usuario
- ✔️ README claro + pruebas unitarias opcionales
- ✔️ Navegación y routing configurado

---

## 🙋 Autor

**Juan Ostos**  

---

## 📜 Licencia

Proyecto educativo - sin uso comercial.



