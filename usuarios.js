const getInfo = async() => {
    try {
        let id = localStorage.getItem("id");
        if (id === null){
             window.location.href = 'index.html';
        }
        const peticion = await fetch(endPoint + '/usuarios.php?id=' + id, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
        const data = await peticion.json();

        if (data.response) {

            if (data.grupo !== 'A') {
                window.location.href = 'perfil.html';
            }

            let info  = data.usuarios;
            var contenedor = document.getElementById('usuarios');
            var table = document.createElement("table");
            table.className = 'listado styled-table';

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            var txt = document.createTextNode('Id');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Nombre');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Apellido');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Correo');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Privilegios');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Fecha');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            thead.appendChild(tr);
            table.appendChild(thead);

            var tbody = document.createElement("tbody");
            for (var stock in info) {
                var tr = document.createElement("tr");
                var txt = document.createTextNode(info[stock]['usuarioid']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createTextNode(info[stock]['nombre']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createTextNode(info[stock]['apellido']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createTextNode(info[stock]['correo']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                let privilegio = (info[stock]['privilegios'] === 'A') ? 'Admin' : 'Editor';
                var txt = document.createTextNode(privilegio);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createTextNode(info[stock]['fecha']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);

                var txt = document.createTextNode('Editar');
                var linkEditar = document.createElement("a");
                linkEditar.href = "javascript:void(0);";
                linkEditar.data = info[stock]['usuarioid'];
                linkEditar.addEventListener("click", function(e){
                    EditUser(e.target);
                }); 
                linkEditar.appendChild(txt);
                var txt = document.createTextNode('Eliminar');
                var linkEliminar = document.createElement("a");
                linkEliminar.href = "javascript:void(0);";
                linkEliminar.data = info[stock]['usuarioid'];
                linkEliminar.addEventListener("click", function(e){
                    DeleteUser(e.target);
                }); 
                linkEliminar.appendChild(txt);
                var td = document.createElement("td");
                td.appendChild(linkEditar);
                var txt = document.createTextNode(' | ');
                td.appendChild(txt);
                td.appendChild(linkEliminar);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }

            table.appendChild(tbody);

            contenedor.appendChild(table);
        } else {
            window.location.href = 'index.html';
        }
    } catch (error) {
        window.location.href = 'index.html';
    }
}

getInfo();

EditUser = id => {
    localStorage.removeItem('usuarioid');
    localStorage.setItem("usuarioid", id.data);
    window.location.href = 'editar-usuario.html';
 }

 DeleteUser = async(id) => {
    const peticion = await fetch(endPoint + '/delete-usuario.php', {
        method: 'POST',
		body: JSON.stringify({id: id.data}),
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    });
    const data = await peticion.json();
    if (data.status) {
        window.location.href = 'usuarios.html';
    } else {
        alert("Usuario no pudo ser eliminado!");
    }
 }