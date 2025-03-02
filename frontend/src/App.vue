<template>
  <Header />
  <hr class="divisor">
  <router-view />
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

