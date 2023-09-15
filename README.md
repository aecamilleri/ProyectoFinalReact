# Tienda Online Generica 

La Tienda en Línea de Productos es una aplicación web diseñada para brindar al usuario la experiencia de compra en línea. El propósito es ofrecer una variedad de productos que el usuario pueda explorar y adquirir.

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso](#uso)
- [Características Principales](#características-principales)
- [Contacto](#contacto)

## Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Estructura del Proyecto
my-project/
├── App.js
├── Firebase.js
├── index.js
├── index.scss
├── components/
│ ├── Cart.js
│ ├── CartContext.js
│ ├── CartWidget.js
│ ├── Categories.js
│ ├── CategoryProducts.js
│ ├── Footer.js
│ ├── Header.js
│ ├── ItemCount.js
│ ├── ItemDetailContainer.js
│ ├── ItemDetails.js
│ ├── ItemList.js
│ ├── ItemListContainer.js
│ ├── Main.js
│ ├── NavBar.js
│ └── PropGreeting.js
├── Otros directorios y archivos

## Configuración

Para configurar y ejecutar el proyecto en un entorno local sigue los siguientes pasos:
   ### Paso 1: Clonar el Repositorio
    Clona el repositorio de tu proyecto desde GitHub o la plataforma de control de versiones que estés utilizando.
    git clone https://github.com/aecamilleri/ProyectoFinalReact
   ### Paso 2: Instalar las Dependencias usando npm o yarn
    npm install
        # o
    yarn install
   ### Paso 3: Configurar Firebase
    Crea un proyecto en Firebase si aún no tienes uno.
    Ve a la consola de Firebase, agrega una aplicación web y sigue las instrucciones para obtener la configuración de Firebase, que incluye la API Key, Auth Domain, Project ID, etc.
    Copia la configuración en tu archivo Firebase.js. Reemplaza las credenciales de ejemplo con las tuyas.
   ### Paso 4: Iniciar la Aplicación
    Una vez que hayas configurado Firebase, puedes iniciar la aplicación. Ejecuta el siguiente comando en la raíz de tu proyecto:
    npm start
        # o
    yarn start
    Esto iniciará la aplicación en un servidor local y debería abrir automáticamente un navegador web con la aplicación en ejecución.
   ### Paso 5: Explora la Aplicación
    Abra su navegador y navegue hasta http://localhost:3000 para ver el sitio web del proyecto.

## Uso

   ### Página de Inicio
    Cuando inicies la aplicación, serás redirigido a la página de inicio. Aquí encontrarás una vista general de los productos disponibles.
   ### Navegación
    En la parte superior de la aplicación, encontrarás una barra de navegación que te permitirá moverte entre las diferentes secciones de la aplicación. Las secciones incluyen:
   * Inicio: Te lleva de vuelta a la página de inicio.
   * Categorías: Aquí puedes explorar productos por categoría.
   * Carrito: Muestra los productos que has agregado al carrito de compras.
   ### Explorando Productos
    En la página de inicio y la sección de categorías, puedes hacer clic en cualquier producto para ver más detalles.
   * Detalles del Producto
     Cuando haces clic en un producto, serás llevado a una página de detalles del producto. Aquí encontrarás información detallada sobre el producto, incluyendo su nombre, descripción, precio y disponibilidad.
   * Agregar al Carrito
     En la página de detalles del producto, puedes seleccionar la cantidad que deseas comprar utilizando el contador de cantidad. Luego, haz clic en "Agregar al Carrito" para añadir el producto a tu carrito de compras.
   * Carrito de Compras
     Para acceder a tu carrito de compras, haz clic en la opción "Carrito" en la barra de navegación.
     En la página del carrito de compras, verás una lista de los productos que has agregado, junto con sus cantidades y precios unitarios.
     Puedes eliminar productos del carrito haciendo clic en el botón "Eliminar" junto a cada producto.
     Para confirmar tu compra, completa tus datos personales, como tu nombre y dirección de correo electrónico, en el formulario proporcionado y haz clic en "Confirmar Compra".
   ### Navegar por Categorías
     En la sección "Categorías", puedes explorar productos por categoría. Haz clic en una categoría para ver los productos relacionados.
   ### Continuar Comprando
    Si deseas seguir comprando después de ver tu carrito de compras, simplemente haz clic en "Seguir Comprando" en la página del carrito.
    Para volver a la página de inicio en cualquier momento, haz clic en "Inicio" en la barra de navegación.

## Características Principales

A continuacion se detalla la función principal de cada componente dentro de la aplicación:

App.js:
Componente principal que envuelve toda la aplicación.
Configura las rutas de navegación y proporciona el contexto del carrito.

Firebase.js:
Inicializa la conexión con Firebase y proporciona acceso a Firestore para almacenar datos, como información de productos y stock.

index.js:
Punto de entrada de la aplicación React.
Renderiza la aplicación en el elemento raíz del DOM.

index.scss:
Archivo de estilo global para tu aplicación, donde puedes definir estilos comunes.

components:
Carpeta que contiene todos los componentes de tu aplicación.

    Cart.js:
    Muestra los productos en el carrito de compras.
    Permite al usuario confirmar la compra y proporciona un formulario para ingresar información del comprador.
    Realiza la resta de stock en Firebase cuando se confirma la compra.

    CartContext.js:
    Define el contexto del carrito de compras y proporciona funciones para agregar, eliminar y vaciar productos del carrito.
    Almacena y sincroniza el carrito en el almacenamiento local del navegador.

    CartWidget.js:
    Muestra un icono de carrito de compras en la barra de navegación que muestra la cantidad de productos en el carrito.
    Permite al usuario acceder rápidamente al carrito.

    Categories.js:
    Muestra una lista de categorías de productos disponibles para que el usuario explore.
    Facilita la navegación por categorías.

    CategoryProducts.js:
    Muestra una lista de productos relacionados con una categoría seleccionada.
    Permite al usuario explorar productos dentro de una categoría específica.

    Footer.js:
    Representa el pie de página de la aplicación, que puede contener información de contacto o enlaces importantes.

    Header.js:
    Representa la cabecera de la aplicación que incluye el logotipo y la barra de navegación.

    ItemCount.js:
    Muestra un contador de cantidad que permite al usuario seleccionar cuántos productos desea agregar al carrito antes de confirmar la compra.

    ItemDetailContainer.js:
    Muestra los detalles completos de un producto específico cuando se selecciona desde la lista de productos.

    ItemDetails.js:
    Muestra información detallada sobre un producto, incluyendo su nombre, descripción y precio.

    ItemList.js:
    Muestra una lista de productos en la página de inicio o en una categoría específica.
    Permite al usuario hacer clic en un producto para ver más detalles.

    ItemListContainer.js:
    Controla la lógica de recuperación de datos de productos y su presentación en la página de inicio o en la lista de categorías.

    Main.js:
    Representa la sección principal del contenido de la aplicación, que puede incluir listas de productos o información destacada.

    NavBar.js:
    Representa la barra de navegación que contiene enlaces a diferentes secciones de la aplicación, incluyendo la página de inicio, categorías y el carrito de compras.

    PropGreeting.js:
    Muestra un mensaje de bienvenida personalizable en función de su propósito.
    Puede utilizarse para mostrar mensajes en diferentes secciones de la aplicación.

## Contacto

- Alejandro Camilleri
- aecamilleri@gmail.com
- https://www.linkedin.com/in/aecamilleri/
