//MODULOS DE NODE JS 
require('colors');
const fs = require('fs')

//MODULOS DEL PROYECTO

const datosArchivo = require('./datos.json')
const main = async() =>{
    console.clear();
    console.log('//////////////////////////');
    console.log(`//   PROYECTOS CLASES   //`)
    console.log('//////////////////////////\n');

    class Producto {
        #codigoProducto;
        #nombreProductos;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto='';
            this.#nombreProductos='';
            this.#inventarioProducto=0;
            this.#precioProducto=0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }

        get getCodigoProducto(){
            return this.#codigoProducto;
        }

        set setNombreProducto(value){
            this.#nombreProductos = value;
        }

        get getNombreProducto(){
            return this.#nombreProductos;
        }

        set setIntventarioProducto(value){
            this.#inventarioProducto = value;
        }

        get getInventarioProducto(){
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value){
            this.#precioProducto = value;
        }

        get getPrecioProducto(){
            return this.#precioProducto;
        }
    }

    class ProductosTienda{
        #lisaProductos;

        constructor(){
            this.#lisaProductos = [];
        }

        get getListaProductos(){
            return this.#lisaProductos;
        }

        cargaArchivoProductos(){
            //Leer los datos de un arcibo JSON
            //Serializarlos para trabajar los datos como un arreglo de objetos de clase Producto
            let contador = 0;
            if (datosArchivo.length > 0) {
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setIntventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#lisaProductos.push(producto);
                });
            } else {
                console.log(`EEROR, el archibo datos.json no contiene datoss\n`.bgRed);
            }
            console.log(`Total de profectos cargados ==>`.bgBlue +`${contador}`.bgRed);
        }

        grabaArchiboProductos(){
            //Escribir datos en un archibo almacenado en unidad
            //Deserializacion para converit un arreglo de objetos de clase en cadena JSON
            const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
                return {
                    codigoProducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getPrecioProducto
                };
            });
            //convertir de array a cadena JSON
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2)
            //variable con el nombre del archibo
            const nombreArchibo = 'datos.json';
            //Grabar cadena JSON en el archibo 
            fs.writeFileSync(nombreArchibo, cadenaJson, 'utf-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchibo}`.bgMagenta);
        }
//Este es un método de una clase
        mostrarProdutos(){
//Se utiliza this.getListaProductos para obtener una lista de productos.
//Luego, se recorre la lista de productos utilizando un bucle forEach.
//Para cada producto en la lista, se utiliza console.log() para imprimir una línea de información sobre el producto. La información incluye el código del producto, el nombre del producto, la cantidad en inventario y el precio del producto. Los valores de cada atributo del producto se obtienen llamando a los correspondientes métodos 
            this.getListaProductos.forEach(producto =>{
                console.log(`|    `+ producto.getCodigoProducto + `    |`+
                            `      `+ producto.getNombreProducto + `    |`+
                            `      `+ producto.getInventarioProducto + `    |`+
                            `      `+ producto.getPrecioProducto + `    |`);
            });
        }

    }
//Se crea un objeto productosTienda utilizando el constructor ProductosTienda esta es la instancia de la clase que se está utilizando para administrar productos de la tienda
    let productosTienda = new ProductosTienda;
//A continuación, se llama al método cargaArchivoProductos en el objeto productosTienda. Este método se utiliza para cargar datos de productos 
    productosTienda.cargaArchivoProductos();
//imprime el mensjae 
    console.log(`DATOS APERTURA TIENDA`.bgBlue);
//Luego de cargar los datos, se llama nuevamente al método mostrarProdutos en el objeto productosTienda, lo que mostrará la información de los productos en la tienda
    productosTienda.mostrarProdutos();
//Se utiliza un bucle forEach para recorrer la lista de productos y se establece la cantidad en inventario de cada producto en un valor aleatorio entre 1 y 19 (mediante Math.random() y Math.floor()). Esto simula la actualización del inventario de productos.
    productosTienda.getListaProductos.forEach(producto =>{
        producto.setIntventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });
//imprime el siguiente mensaje 
    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProdutos();

    productosTienda.grabaArchiboProductos();
}

main();