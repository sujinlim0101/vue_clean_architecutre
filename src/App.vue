<template>
  <img alt="Vue logo" class="main-img" src="./assets/images/power-girls.png">
  <Weather />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Weather from './page/Weather.vue';

export default defineComponent({
  name: 'App',
  components: {
    Weather
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 70px;
}
.main-img {
  width: 500px;
  max-width: 100vw;
}
</style>
