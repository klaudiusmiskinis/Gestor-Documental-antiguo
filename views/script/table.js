
function archivos() {
    try {
        return new Promise(function (resolve, reject) {
            $.get('/archivos').done(resolve).fail(reject);
        });
    } catch (e) {
        return e;
    }
}
let data;
var jqxhr = $.get( "/archivos")
    .done(function(datos) {
        data = datos;
    })
    .fail(function(err) {
      return err;
    })
    .always(function() {
      return true;
    });

new gridjs.Grid({
    columns: ["Name", "Email", "Phone Number"],
    data: [
      ["John", "john@example.com", "(353) 01 222 3333"],
      ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
      ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
      ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
      ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
    ]
  }).render(document.getElementById("tabla-registros"));