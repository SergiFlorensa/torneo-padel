# Panel de administración

Para revisar las inscripciones del formulario y mantener un control de ellas:

1. Define las variables `NETLIFY_TOKEN` y `NETLIFY_SITE_ID` en tu entorno.
2. Ejecuta `netlify dev` en la raíz del proyecto para levantar las funciones.
3. Abre [http://localhost:8888/admin.html](http://localhost:8888/admin.html) en el navegador.
4. Usa el botón **Descargar PDF** para exportar las inscripciones con [pdfMake](https://pdfmake.github.io/docs/).
5. Si aparece algún error, revisa la consola donde corre `netlify dev` para obtener más detalles.
