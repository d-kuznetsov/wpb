<script>
import { ref, computed, reactive, watch } from 'vue';
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

    const ei = reactive(new ExserciseIterator(settings.sets));
    const currentRate = ref(0);

    const currentState = ref('init');
    const onStop = () => {
      currentState.value = 'init';
      ei.reset();
      currentRate.value = 0;
    };
    const onStart = () => {
      currentState.value = 'run';
    };
    const onPause = () => {
      currentState.value = 'pause';
    };
    let lock = computed(() => {
      return currentState.value !== 'run';
    });

    setInterval(() => {
      if (!lock.value) {
        incrementTick();
      }
    }, settings.tick);

    const rate = 100;

    const getRateStep = (sec) => {
      return (rate * settings.tick) / sec;
    };
    let rateStep = getRateStep(ei.next().value);

    watch(tick, () => {
      currentRate.value += rateStep;
      if (currentRate.value > rate) {
        const it = ei.next();
        if (it.done) {
          //toggleLock();
          currentState.value = 'init';
          return;
        }
        rateStep = getRateStep(it.value);
        currentRate.value = 0;
      }
    });

    return {
      onStop,
      onStart,
      onPause,
      rate,
      currentRate,
      currentState,
      ei,
    };
  },
};
</script>

<template>
  <div class="App">
    <Circle :rate="rate" :current-rate="currentRate" />
    <div>
      <span> {{ currentRate }}</span>
      <span>curSet {{ ei.curSet }}</span>
      <span>curRep {{ ei.curRep }}</span>
      <span>rest {{ ei.rest }}</span>
    </div>
    <ControlPanel :state="currentState" @stop="onStop" @start="onStart" @pause="onPause" />
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
