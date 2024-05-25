
## Documentación

"E-Hard" es un E-commerce desarrollado para Smartphones con React Native y Expo
el cual cuenta con un total de 95 productos de hardware distribuidos en 7 categorías. 
El objetivo del proyecto es brindar al usuario una plataforma de compras, simple y de fácil uso.

#### Funcionalidades
* Inicio de sesión y creación de usuarios
* Edición de perfil
* Sección de productos favoritos
* Sección de categorías
* Sección Compras
* Sección Órdenes de Compras
* Carrito de Compras
* Menú desplegable animado
* Listado de productos
* Detalle de Producto
* Barra superior de búsqueda de productos con resultados en tiempo real

#### Recursos utilizados

* Base de datos: Firebase Realtime Database 
* Autenticación de usuarios: Firebase Authentication
* Bucket de almacenamiento de imágenes: Firebase Storage
* Persistencia de sesiones: SQLite
* Emulador: Android Studio "Iguana" sobre dispositivo "PIXEL 7"

#### Dependencias del proyecto
* @expo/metro-runtime: Proporciona soporte para el tiempo de ejecución de Metro bundler específico de Expo.
* @expo/vector-icons: Biblioteca de iconos vectoriales compatible con Expo y React Native, que incluye iconos populares como FontAwesome y MaterialIcons.
* @react-navigation/native: Biblioteca para la navegación en aplicaciones React Native, proporcionando un sistema de navegación declarativo y fácil de usar.
* @react-navigation/native-stack: Implementación de la pila de navegación nativa (Native Stack Navigator) para React Navigation, ofreciendo una experiencia más nativa en iOS y Android.
* @reduxjs/toolkit: Conjunto de herramientas para simplificar el uso de Redux en aplicaciones, incluyendo utilidades para la configuración de la tienda, creación de reducers y manejo de estados    asíncronos.
* expo: El marco y conjunto de herramientas principal de Expo para desarrollar aplicaciones React Native.
* expo-font: Permite el uso y la carga de fuentes personalizadas en una aplicación Expo.
* expo-image-picker: Proporciona una API para seleccionar imágenes y videos desde la biblioteca de medios del dispositivo o la cámara.
* expo-splash-screen: Herramienta para gestionar y personalizar la pantalla de carga inicial de una aplicación Expo.
* expo-sqlite: Proporciona una interfaz para trabajar con bases de datos SQLite dentro de una aplicación Expo. Se utilizó para la persistencia de sesiones de usuario.
* expo-status-bar: Componente para controlar el aspecto y comportamiento de la barra de estado en aplicaciones Expo.
* react: La biblioteca principal de React para construir interfaces de usuario.
* react-dom: Permite el uso de React en aplicaciones web, proporcionando métodos específicos para renderizar componentes en el DOM.
* react-native: El marco principal para desarrollar aplicaciones móviles nativas usando JavaScript y React.
* react-native-dotenv: Permite el uso de variables de entorno en aplicaciones React Native mediante archivos .env. Se utilizó para gestionar el archivo de entorno .env donde se almacena la API KEY de Firebase
* react-native-safe-area-context: Proporciona un contexto para gestionar las áreas seguras en dispositivos móviles, como la muesca en iPhone o las barras de navegación en Android.
* react-native-screens: Optimiza la gestión de pantallas y la navegación en aplicaciones * React Native, mejorando el rendimiento al usar navegadores como React Navigation.
* react-native-web: Permite que el código React Native se ejecute en navegadores web, facilitando la creación de aplicaciones multiplataforma.
* react-redux: Enlace entre React y Redux, facilitando el acceso a la tienda Redux en componentes React.

#### Repositorio
* https://github.com/ArielCorrado/curso-react-native-coder


## Guía de instalación

* Una vez clonado el repositorio o descargado el proyecto
* Instalar las dependencias utilizando el comando de consola: 
    * "**npm i**" 
* Insertar en la raíz del proyecto el archivo .env proporcionado por el autor
* Descargar Android Studio y ejecutar el emulador de Smartphones
* Instalar "Expo Go" en el dispositivo virtual desde el store
* Ejecutar en la consola el comando:
    * "**npm run android**" para dispositivos Android
    * "**npm run ios**" para dispositivos iOS
    * "**npm run web**" para pruebas en el navegador



