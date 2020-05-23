<template>
  <div class="home">
    <Renju v-if="windowWidth >= 535"/>
    <RenjuMobile v-else/>
  </div>
</template>

<script>
import Renju from '@/components/Renju.vue';
import RenjuMobile from '@/components/RenjuMobile.vue';

export default {
  name: 'Home',
  components: {
    Renju,
    RenjuMobile,
  },
  data() {
    return {
      windowWidth: 535,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>
