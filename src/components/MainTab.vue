<script>
import { ref, computed, watch } from 'vue';
import Circle from './progress/Circle.vue';
import settings from '../lib/settings';

const PERIOD = 40;

export default {
  components: {
    Circle,
  },
  props: {
    sets: {
      default: settings.sets,
    },
  },
  setup(props) {
    const state = ref('run');
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

    watch(tick, () => {
      if (currentSet.value < props.sets.length) {
        if (currentRep.value < props.sets[currentSet.value].reps) {
          currentRate.value += step.value;
          if (currentRate.value >= 100) {
            currentRate.value = 0;
            if (isWorking.value) {
              isWorking.value = false;
            } else {
              isWorking.value = true;
              currentRep.value++;
            }
          }
        } else {
          currentRep.value = 0;
          currentSet.value++;
        }
      } else {
        state.value = 'final';
      }
    });

    return {
      currentSet,
      currentRep,
      isWorking,
      currentRate,
    };
  },
};
</script>

<template>
  <Circle :rate="100" :current-rate="currentRate" />
  <div>currentSet {{ currentSet }}</div>
  <div>currentRep {{ currentRep }}</div>
  <div>isWorking {{ isWorking }}</div>
  <div>currentRate {{ currentRate }}</div>
</template>
