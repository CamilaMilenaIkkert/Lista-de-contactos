<template>
    <div class="mainView">
        <h1 class="title">Agregar Contacto</h1>
        <form @submit.prevent="addContact" class="formContact">
            <div class="formContainer">
                <label for="nombre" class="formLabel">Nombre</label>
                <input class="formInput" v-model="contact.nombre" type="text" id="nombre" required />
            </div>

            <div class="formContainer">
                <label for="apellido" class="formLabel">Apellido</label>
                <input class="formInput" v-model="contact.apellido" type="text" id="apellido" required />
            </div>

            <div class="formContainer">
                <label for="dni" class="formLabel">DNI</label>
                <input class="formInput" v-model="contact.dni" type="text" id="dni" required />
            </div>

            <div class="formContainer">
                <label for="mail" class="formLabel">Email</label>
                <input class="formInput" v-model="contact.mail" type="email" id="mail" required />
            </div>

            <div class="formContainer" id="btn">
                <button type="submit">
                    Guardar Contacto
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const router = useRouter();

const contact = ref({
    nombre: '',
    apellido: '',
    dni: '',
    mail: ''
});

const emit = defineEmits(['add-contact']); 

const addContact = async () => {
    try {
        const response = await axios.post('http://localhost:5000/empleados', contact.value);
        console.log('Contacto agregado:', response.data);

        emit('add-contact', response.data.contacto); 
        contact.value = { nombre: '', apellido: '', dni: '', mail: '' }; 
        router.push('/');
    } catch (error) {
        console.error('Error al agregar contacto:', error);
    }
};
</script>