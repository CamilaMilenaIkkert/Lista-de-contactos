<template>
    <div class="primerDiv">
        <div>
            <p class="nombreApellido">{{ contact.nombre }} {{ contact.apellido }}</p>
            <p class="dniContacto"><span>D.N.I: </span>{{ contact.dni }}</p>
            <p class="mailContacto"><span>Mail: </span>{{ contact.mail }}</p>
        </div>

        <div class="editDeleteDiv">
            <button @click="openEditModal"
                class="buttonEdit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
            </button>

            <button @click="openDeleteModal"
                class="buttonDelete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24px" height="24px"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg> 
            </button>
        </div>
    </div>

    <!-- Modal de confirmacion para eliminar contacto -->
    <div v-if="showDeleteModal" class="modalBack">
        <div class="modalContainer">
            <h2 class="modalTitle">¿Estás seguro de que deseas eliminar este contacto?</h2>
            <div class="modalContent">
                <button @click="showDeleteModal = false"
                    class="modalBtn">
                    Cancelar
                </button>
                <button @click="deleteContact(contact.id_empleado)" class="buttonDelete">

                    Eliminar
                </button>
            </div>
        </div>
    </div>

    <!-- Modal para editar contacto -->
    <div v-if="showEditModal" class="modalBack">
        <div class="modalContainer">
            <h2 class="modalTitle">Editar Contacto</h2>

            <div class="input-group">
                <label class="input-label">Nombre:</label>
                <input v-model="editedContact.nombre" class="input-field">
            </div>

            <div class="input-group">
                <label class="input-label">Apellido:</label>
                <input v-model="editedContact.apellido" class="input-field">
            </div>

            <div class="input-group">
                <label class="input-label">D.N.I:</label>
                <input v-model="editedContact.dni" type="tel" class="input-field">
            </div>

            <div class="input-group">
                <label class="input-label">Email:</label>
                <input v-model="editedContact.mail" type="email" class="input-field">
            </div>


            <div class="button-group">
                <button @click="showEditModal = false"
                    class="modalBtn">
                    Cancelar
                </button>
                <button @click="saveContact" class="modalBtn">
                    Guardar
                </button>
            </div>
        </div>
    </div>

<!-- Pop-up confirmacion -->
    <div v-if="showMessage" class="popUpContainer">
        <div class="popUpContent">
            <h3 class="popUpMessage">{{ statusMessage }}</h3>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrash);

const props = defineProps({
    contact: Object
});

const emit = defineEmits(['delete-contact', 'update-contact']);

const showDeleteModal = ref(false);
const showEditModal = ref(false);
const showMessage = ref(false);
const statusMessage = ref('');

const editedContact = ref({ ...props.contact });

const openDeleteModal = () => {
    showDeleteModal.value = true;
};

const openEditModal = () => {
    editedContact.value = { ...props.contact };
    showEditModal.value = true;
};

const deleteContact = async (id) => {
    if (!id) {
        statusMessage.value = '❌Error: ID no definido';
        showMessage.value = true;
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:5000/empleados/${id}`);
        console.log('Contacto eliminado:', response.data);
        emit('delete-contact', id);

        statusMessage.value = '✅Contacto eliminado correctamente.';
        showMessage.value = true;
        showEditModal.value = false;

        setTimeout(() => {
            showMessage.value = false; 
            window.location.reload();
        }, 3000);
    } catch (error) {
        statusMessage.value = '❌Error al eliminar el contacto.', error;
        showMessage.value = true;

        setTimeout(() => {
            showMessage.value = false;
        }, 3000);
    }
};

const saveContact = async () => {
    try {
        await axios.put(`http://localhost:5000/empleados/${editedContact.value.id_empleado}`, editedContact.value);
        emit('update-contact', editedContact.value);

        statusMessage.value = '✅Contacto actualizado correctamente.';
        showMessage.value = true;
        showEditModal.value = false;

        setTimeout(() => {
            showMessage.value = false; 
            window.location.reload();
        }, 3000);
    } catch (error) {
        statusMessage.value = '❌Error al actualizar el contacto.', error;
        showMessage.value = true;

        setTimeout(() => {
            showMessage.value = false;
        }, 3000);
    }
};
</script>
