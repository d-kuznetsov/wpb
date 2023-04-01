<script>
import { ref, computed, watch } from 'vue';
import Circle from './progress/Circle.vue';
import ControlPanel from './ControlPanel.vue';
import settings from '../lib/settings';

const PERIOD = 40;

export default {
  components: {
    Circle,
    ControlPanel,
  },
  props: {
    sets: {
      default: settings.sets,
    },
  },
  setup(props) {
    const state = ref('init');
    const isTickLocked = computed(() => state.value !== 'run');
    const tick = ref(false);
    setInterval(() => {
      if (!isTickLocked.value) {
        tick.value = !tick.value;
      }
    }, PERIOD);

    const currentSet = ref(0);
    const currentRep = ref(0);
    const isWorking = ref(true);
    const step = computed(() => {
      const key = isWorking.value ? 'work' : 'rest';
      const duration = props.sets[currentSet.value][key];
      return (100 * PERIOD) / (duration * 1000);
    });
    const currentRate = ref(0);

    const onRestart = () => {
      state.value = 'init';
      currentSet.value = 0;
      currentRep.value = 0;
      isWorking.value = true;
      currentRate.value = 0;
    };
    const onStart = () => {
      state.value = 'run';
    };
    const onPause = () => {
      state.value = 'pause';
    };

    watch(tick, () => {
      currentRate.value += step.value;
      if (currentRate.value >= 100) {
        if (isWorking.value) {
          isWorking.value = false;
        } else {
          isWorking.value = true;
          if (currentRep.value + 1 === props.sets[currentSet.value].reps) {
            if (currentSet.value + 1 === props.sets.length) {
              state.value = 'final';
            } else {
              currentRep.value = 0;
              currentSet.value++;
            }
          } else {
            currentRep.value++;
          }
        }
        if (state.value !== 'final') {
          currentRate.value = 0;
        }
      }
    });

    return {
      state,
      currentSet,
      currentRep,
      isWorking,
      currentRate,
      onRestart,
      onStart,
      onPause,
    };
  },
};
</script>

<template>
  <div class="MainTab">
    <Circle :rate="100" :current-rate="currentRate" class="MainTab__progress-bar" />
    <ControlPanel :state="state" @restart="onRestart" @start="onStart" @pause="onPause" />
  </div>
</template>

<style lang="postcss">
.MainTab {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__progress-bar {
    flex: 1;
  }
}
</style>
