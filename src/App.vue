<script>
import { ref } from 'vue';
import settings from './lib/settings';
import Circle from './components/progress/Circle.vue';
import ControlPanel from './components/ControlPanel.vue';

export default {
  components: {
    Circle,
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

    const onPause = () => {
      toggleLock();
    };

    return {
      toggleLock,
      onPause,
      tick,
    };
  },
};
</script>

<template>
  <div class="App">
    <Circle />
    <ControlPanel @pause="onPause" />
    {{ tick }}
  </div>
</template>
<style lang="postcss">
.App {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  outline-style: dotted;
}
</style>
