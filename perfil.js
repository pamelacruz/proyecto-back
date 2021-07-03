const setPerfil = async() => {
    try {
        let id = localStorage.getItem("id");
        if (id === null){
             window.location.href = 'usuarios.html';
        }
        const peticion = await fetch(endPoint + '/usuario.php?usuarioid=' + id, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
        const data = await peticion.json();
        if (data.response) {
            let info  = data.usuario;

            contenedor = document.getElementById('perfil');
            var table = document.createElement("table");
            table.className = 'listado styled-table';
            var tbody = document.createElement("tbody");
            
            var tr = document.createElement("tr");
            var txt = document.createTextNode("Id: " + info['usuarioid']);
            var td = document.createElement("td");
            td.appendChild(txt);
            tr.appendChild(td);
            tbody.appendChild(tr);

            var tr = document.createElement("tr");
            var txt = document.createTextNode("Nombre: " + info['nombre']);
            var td = document.createElement("td");
            td.appendChild(txt);
            tr.appendChild(td);
            tbody.appendChild(tr);

            var tr = document.createElement("tr");
            var txt = document.createTextNode("Apellido: " + info['apellido']);
            var td = document.createElement("td");
            td.appendChild(txt);
            tr.appendChild(td);
            tbody.appendChild(tr);

            var tr = document.createElement("tr");
            var txt = document.createTextNode("Correo: " + info['correo']);
            var td = document.createElement("td");
            td.appendChild(txt);
            tr.appendChild(td);
            tbody.appendChild(tr);
            
            table.appendChild(tbody);

            contenedor.appendChild(table);

            localStorage.removeItem('usuarioid');
            localStorage.setItem("usuarioid", info['usuarioid']);
        } else {
            window.location.href = 'usuarios.html';
        }
    } catch (error) {
        window.location.href = 'usuarios.html';
    }
}

setPerfil();