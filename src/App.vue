<script>
import { ref } from 'vue';
import settings from './lib/settings';

export default {
  setup() {
    const tick = ref(0);
    const incrementTick = () => {
      tick.value++;
    };

    let lock = true;
    const toggleLock = () => {
      lock = !lock;
    };
    setInterval(() => {
      if (!lock) {
        incrementTick();
      }
    }, settings.tick);

    return {
      toggleLock,
    };
  },
};
</script>

<template>
  <header>Header</header>

  <main>Content</main>
</template>
