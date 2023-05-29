
function validar() {
    var nombre, apellido, provincia, localidad, correo, telefono, asunto, mensaje, expresion;
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    provincia = document.getElementById("provincia").value;
    localidad = document.getElementById("localidad").value;
    correo = document.getElementById("correo").value;
    telefono = document.getElementById("telefono").value;
    asunto = document.getElementById("asunto").value;
    mensaje = document.getElementById("mensaje").value;

    expresion = /\w+@\w+\.+[a-z]/;
    
    if(nombre === "" || apellido === ""  || provincia === "" || localidad === "" ||
    correo === "" || telefono === "" || asunto === "" || mensaje === ""){
        alert("El campo Nombre esta vacio");
        return false;
    }
    else if (nombre.lenght >50) {
        alert("El nombre es muy largo");
        return false;
    }
    else if (apellido.lenght >80) {
        alert("El apellido es muy largo");
    }
    else if (!expresion.test(correo)) {
        alert("El correo no es valido");
        return false;
    }
};

