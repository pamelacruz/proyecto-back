document.getElementById("agregar").addEventListener("submit", function(e){
    e.preventDefault();
    setUser(e);
});

const setUser = async(e) => {
    try {
        const peticion = await fetch(endPoint + '/agregar-usuario.php', {
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