<template>
  <div class="mainView">
      <ContactItem 
        v-for="contact in contacts" 
        :key="contact.id" 
        :contact="contact" 
        @delete-contact="handleDeleteContact"
        @update-contact="handleUpdateContact"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ContactItem from '@/components/ContactItem.vue';
import axios from 'axios'; 

const contacts = ref([]);

const fetchContacts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/empleados');
    contacts.value = response.data;
  } catch (error) {
    console.error('Error al obtener contactos:', error);
  }
};

onMounted(() => {
  fetchContacts();
});

const handleDeleteContact = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/empleados/${id}`);
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
  }
};

const handleUpdateContact = async (updatedContact) => {
  try {
    await axios.put(`http://localhost:5000/empleados/${updatedContact.id}`, updatedContact);
    const index = contacts.value.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
    }
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
  }
};
</script>
  