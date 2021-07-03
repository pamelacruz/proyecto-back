document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    getUser(e);
});

const getUser = async(e) => {
    try {
        const peticion = await fetch(endPoint + '/login.php', {
            method: 'POST',
		    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
        const data = await peticion.json();
        if (parseInt(data.login) > 0) {
            localStorage.setItem("id", data.id);
            localStorage.setItem("menu", JSON.stringify(data.menu));
            localStorage.setItem("privilegios", data.privilegios);
            window.location.href = 'imagenes.html';
        }else{
        alert(data.error);
        }
    } catch (error) {
        alert("error");
    }
}