document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("data-container");


    function displayLastContactData(formData) {
        if (!formData || formData.length === 0) {
            container.innerHTML = "<p>No se han recibido datos.</p>";
            return;
        }

        const lastData = formData[formData.length - 1];

        container.innerHTML = `
            <article class="game-item" id="data-display">
                <h4>Nombre:</h4>
                <p id="display-name">${lastData.name}</p>

                <h4>Email:</h4>
                <p id="display-email">${lastData.email}</p>

                <h4>Asunto:</h4>
                <p id="display-subject">${lastData.subject}</p>

                <h4>Mensaje:</h4>
                <p id="display-message">${lastData.message}</p>
            </article>

            <div id="action-buttons">
                <button id="edit-last-btn" class="button-secondary edit-button">Editar Último Dato</button>
                <button id="delete-last-btn" class="button-secondary delete-button">Borrar Último Dato</button>
            </div>

            <form id="edit-form" class="contact-form hidden">
                <h3>Editar Datos</h3>
                <label for="edit-name">Nombre</label>
                <input id="edit-name" type="text" value="${lastData.name}" required>

                <label for="edit-email">Correo</label>
                <input id="edit-email" type="email" value="${lastData.email}" required>

                <label for="edit-subject">Asunto</label>
                <input id="edit-subject" type="text" value="${lastData.subject}" required>

                <label for="edit-message">Mensaje</label>
                <textarea id="edit-message" rows="4" required>${lastData.message}</textarea>

                <button type="submit" class="button-secondary">Guardar Cambios</button>
                <button type="button" id="cancel-edit-btn" class="button-secondary">Cancelar</button>
            </form>
        `;

        document.getElementById("delete-last-btn").addEventListener("click", deleteLastContactEntry);
        document.getElementById("edit-last-btn").addEventListener("click", toggleEditMode);
        document.getElementById("cancel-edit-btn").addEventListener("click", toggleEditMode);
        document.getElementById("edit-form").addEventListener("submit", saveEditedData);
    }

    function toggleEditMode() {
        const dataDisplay = document.getElementById("data-display");
        const actionButtons = document.getElementById("action-buttons");
        const editForm = document.getElementById("edit-form");

        dataDisplay.classList.toggle('hidden');
        actionButtons.classList.toggle('hidden');
        editForm.classList.toggle('hidden');
    }

    function saveEditedData(event) {
        event.preventDefault();

        const newName = document.getElementById('edit-name').value.trim();
        const newEmail = document.getElementById('edit-email').value.trim();
        const newSubject = document.getElementById('edit-subject').value.trim();
        const newMessage = document.getElementById('edit-message').value.trim();


        let formData = JSON.parse(localStorage.getItem("formData"));
        if (formData && formData.length > 0) {
            const lastIndex = formData.length - 1;

            formData[lastIndex].name = newName;
            formData[lastIndex].email = newEmail;
            formData[lastIndex].subject = newSubject;
            formData[lastIndex].message = newMessage;

            localStorage.setItem("formData", JSON.stringify(formData));

            displayLastContactData(formData);

            toggleEditMode();
        }
    }

    function deleteLastContactEntry() {
        let formData = JSON.parse(localStorage.getItem("formData"));

        if (formData && formData.length > 0) {
            formData.pop();
            localStorage.setItem("formData", JSON.stringify(formData));
            displayLastContactData(formData);
        }
    }


    let initialFormData = JSON.parse(localStorage.getItem("formData"));
    displayLastContactData(initialFormData);
});