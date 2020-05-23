<template>
  <div class="home">
    <Renju/>
  </div>
</template>

<script>
import Renju from '@/components/Renju.vue';

export default {
  name: 'Home',
  components: {
    Renju,
  },
};
</script>
