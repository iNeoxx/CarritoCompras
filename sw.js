const nombreCache = 'apv-v1';
const archivos = [
    '/',          //la página principal o sea 127.0.0.1:5500
    '/index.html',//el archivo principal a renderizar
    '/css/bootstrap.css',
    '/css/bootstrap-grid.min.css',
    '/css/bootstrap-reboot.css',
    '/css/bootstrap-reboot.min.css',
    '/css/styles.css',
    '/css/bootstrap.min.css',
    '/css/custom.css',
    '/css/normalize.css',
    '/css/skeleton.css',
    '/js/app.js',
    '/js/appV.js',
];

//instalar el service worker
self.addEventListener('install', e=>{
    console.log('Instalado el service worker');
     //espera a que se hayan descargado todos lo cache de archivos
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache => {                   //un promise para cargar caché
            console.log('cacheando');
            cache.addAll(archivos)  //cache.add(archivo); si fuera un solo archivo en caché
        })
    )
});
self.addEventListener('activate', e=>{
    console.log('Activado el service worker');
})

//evento fetch para descargar archivos estatico.

self.addEventListener('fetch', e=>{
    console.log('Fetch ...', e)    

    //para cargar los elementos de caché
    e.respondWith(
       caches.match(e.request)  //busca lo que tengamos en caché
          .then(respuestaCache => {  //si es positivo...
            return respuestaCache  //carga lo que hay en caché
    })
    )
})