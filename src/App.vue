<script>
import { ref, watch } from 'vue';
import settings from './lib/settings';
import { ExserciseIterator } from './lib';
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

    const ei = new ExserciseIterator(settings.sets);

    const rate = 100;
    const currentRate = ref(0);
    const getRateStep = (sec) => {
      return (rate * settings.tick) / sec;
    };
    let rateStep = getRateStep(ei.next().value);

    watch(tick, () => {
      currentRate.value += rateStep;
      if (currentRate.value > rate) {
        const it = ei.next();
        if (it.done) {
          toggleLock();
          return;
        }
        rateStep = getRateStep(it.value);
        currentRate.value = 0;
      }
    });

    return {
      toggleLock,
      onPause,
      rate,
      currentRate,
    };
  },
};
</script>

<template>
  <div class="App">
    <Circle :rate="rate" :current-rate="currentRate" />
    {{ currentRate }}
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
