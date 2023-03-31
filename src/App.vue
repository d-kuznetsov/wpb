<script>
import { ref } from 'vue';
import settings from './lib/settings';
import ControlPanel from './components/ControlPanel.vue';

export default {
  components: {
    ControlPanel,
  },
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
  <div class="App">
    <ControlPanel />
  </div>
</template>
<style lang="postcss">
.App {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  outline-style: dotted;
}
</style>
