const getInfo = async() => {
    try {
        let id = localStorage.getItem("id");
        let privilegios = localStorage.getItem("privilegios");
        if (id === null){
             window.location.href = 'index.html';
        }
        const peticion = await fetch(endPoint + '/imagen.php?id=' + id + "&privilegios=" + privilegios, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
        const data = await peticion.json();
        if (data.response) {
            let info  = data.imagenes;
            var contenedor = document.getElementById('imagenes');
            var table = document.createElement("table");
            table.className = 'listado styled-table';

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            var txt = document.createTextNode('Id');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Titulo');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            var txt = document.createTextNode('Imagen');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            if (privilegios === 'A') {
                var txt = document.createTextNode('# Usuario');
                var td = document.createElement("th");
                td.appendChild(txt);
                tr.appendChild(td);
            }
            var txt = document.createTextNode('');
            var td = document.createElement("th");
            td.appendChild(txt);
            tr.appendChild(td);
            thead.appendChild(tr);
            table.appendChild(thead);

            var tbody = document.createElement("tbody");
            for (var stock in info) {
                var tr = document.createElement("tr");
                var txt = document.createTextNode(info[stock]['imagenid']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createTextNode(info[stock]['titulo']);
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);
                var txt = document.createElement("img");
                txt.src = "http://localhost:8888/servicio/images/" + info[stock]['nombre'];
                txt.width = "100";
                var td = document.createElement("td");
                td.appendChild(txt);
                tr.appendChild(td);

                if (privilegios === 'A') {
                    var txt = document.createTextNode(info[stock]['usuarioid']);
                    var td = document.createElement("th");
                    td.appendChild(txt);
                    tr.appendChild(td);
                }

                var txt = document.createTextNode('Eliminar');
                var linkEliminar = document.createElement("a");
                linkEliminar.href = "javascript:void(0);";
                linkEliminar.data = info[stock]['imagenid'];
                linkEliminar.addEventListener("click", function(e){
                    DeleteImagen(e.target);
                }); 
                linkEliminar.appendChild(txt);
                var td = document.createElement("td");
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


DeleteImagen = async(id) => {
    const peticion = await fetch(endPoint + '/delete-imagen.php', {
        method: 'POST',
		body: JSON.stringify({id: id.data}),
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    });
    const data = await peticion.json();
    if (data.status) {
        window.location.href = 'imagenes.html';
    } else {
        alert("Imagen no pudo ser eliminada!");
    }
}