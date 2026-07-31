const formulario = document.getElementById("mangaForm");
const tabla = document.getElementById("tablaMangas");
const buscador = document.getElementById("buscar");

let mangas = JSON.parse(localStorage.getItem("mangas")) || [];
let indiceEditar = -1;

mostrarMangas();

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const manga = {

        titulo: document.getElementById("titulo").value,

        autor: document.getElementById("autor").value,

        genero: document.getElementById("genero").value,

        estado: document.getElementById("estado").value

    };

    if (indiceEditar === -1) {

        mangas.push(manga);

    } else {

        mangas[indiceEditar] = manga;

        indiceEditar = -1;

    }

    guardarDatos();

    formulario.reset();

});

function mostrarMangas() {

    tabla.innerHTML = "";

    const texto = buscador.value.toLowerCase();

    const filtrados = mangas.filter(manga =>
        manga.titulo.toLowerCase().includes(texto)
    );

    filtrados.forEach((manga) => {

        const indexOriginal = mangas.indexOf(manga);

        tabla.innerHTML += `

        <tr>

            <td>${manga.titulo}</td>

            <td>${manga.autor}</td>

            <td>${manga.genero}</td>

            <td>${manga.estado}</td>

            <td>

                <button class="editar" onclick="editarManga(${indexOriginal})">Editar</button>

                <button class="eliminar" onclick="eliminarManga(${indexOriginal})">Eliminar</button>

            </td>

        </tr>

        `;

    });

}

function guardarDatos() {

    localStorage.setItem("mangas", JSON.stringify(mangas));

    mostrarMangas();

}

function eliminarManga(index) {

    const manga = mangas[index];

    if (confirm(`¿Seguro que deseas eliminar "${manga.titulo}"? Esta acción no se puede deshacer.`)) {

        mangas.splice(index, 1);

        guardarDatos();

    }

}

function editarManga(index) {

    const manga = mangas[index];

    document.getElementById("titulo").value = manga.titulo;
    document.getElementById("autor").value = manga.autor;
    document.getElementById("genero").value = manga.genero;
    document.getElementById("estado").value = manga.estado;

    indiceEditar = index;

}

buscador.addEventListener("input", mostrarMangas);