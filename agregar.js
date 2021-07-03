document.getElementById("agregar").addEventListener("submit", function(e){
    e.preventDefault();
    setCurriculum(e);
});

const setCurriculum = async(e) => {
    try {
        let id = localStorage.getItem("id");
        if (id === null) {
             window.location.href = 'index.html';
        }
        const peticion = await fetch(endPoint + '/agregar-imagen.php?id=' + id, {
            method: 'POST',
		    body: new FormData(e.target)
        });

        const data = await peticion.json();
        if (parseInt(data.status) > 0) {
            window.location.href = 'imagenes.html';
        } else{
            alert("Error al insertar los datos");
        }
        
    } catch (error) {
        alert("error");
    }
}