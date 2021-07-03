const setForm = async() => {
    try {
        let usuarioid = localStorage.getItem("usuarioid");
        if (usuarioid === null){
             window.location.href = 'usuarios.html';
        }
        const peticion = await fetch(endPoint + '/usuario.php?usuarioid=' + usuarioid, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
        const data = await peticion.json();
        if (data.response) {
            let info  = data.usuario;
            document.getElementById('usuarioid').value  = info['usuarioid'];
            document.getElementById('nombre').value  = info['nombre'];
            document.getElementById('apellido').value  = info['apellido'];
            document.getElementById('correo').value  = info['correo'];
            document.getElementById('password').value  = '';
            document.getElementById('privilegios').value  = info['privilegios'];

        } else {
            debugger;
            window.location.href = 'usuarios.html';
        }
    } catch (error) {
        debugger;
        window.location.href = 'usuarios.html';
    }
}

setForm();

document.getElementById("editar").addEventListener("submit", function(e){
    e.preventDefault();
    editUser(e);
});

const editUser = async(e) => {
    try {
        const peticion = await fetch(endPoint + '/editar-usuario.php', {
            method: 'POST',
		    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });

        const data = await peticion.json();
        if (parseInt(data.status) > 0) {
            window.location.href = 'usuarios.html';
        }
        alert(data.error);
    } catch (error) {
        alert("error");
    }
}