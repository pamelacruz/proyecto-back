var endPoint = 'http://localhost:8888/servicio';

const Logout = key => {
    localStorage.removeItem("id");
    localStorage.removeItem("menu");
    localStorage.removeItem("privilegios");
    window.location.href = 'index.html';
}

let menu = JSON.parse(localStorage.getItem("menu"));
var contenedor = document.getElementById('menu');
if (contenedor !== null) {
    for (var key in menu) {
        var txt = document.createTextNode(menu[key]['titulo']);
        var a = document.createElement("a");
        a.href = menu[key]['link'];
        if (menu[key]['titulo'] == 'Salir') {
            a.addEventListener("click", function(e){
                Logout();
            });
            a.href = "javascript:void(0);";
        } 
        a.appendChild(txt);
        var li = document.createElement("li");
        li.appendChild(a);
        contenedor.appendChild(li);
    }
}

var select = document.getElementById('privilegios');
if (select !== null) {
    let privilegios = localStorage.getItem("privilegios");
    if (privilegios !== 'A') {
        const elemento = select.querySelector(`option[value='A']`);
        elemento.remove();
    }
}