// Detecta clique com botão direito
document.addEventListener('mousedown', function(event) {

    // Verifica se foi botão direito
    if(event.button === 2) {

        // Previne menu de contexto
        event.preventDefault();

    }

});


// Detecta inspecionar elemento
document.addEventListener('contextmenu', function(event) {

    // Previne menu de contexto
    event.preventDefault();

    // Fecha página
    window.close();

});