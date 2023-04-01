<script>
import { ref, computed, watch } from 'vue';
import { NoticeBar } from 'vant';
import ProgressBar from './ProgressBar.vue';
import ControlPanel from './ControlPanel.vue';
import settings from '../lib/settings';

const PERIOD = 40;

export default {
  components: {
    NoticeBar,
    ProgressBar,
    ControlPanel,
  },
  props: {
    sets: {
      default: settings.sets,
    },
  },
  setup(props) {
    const state = ref('initial');
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
      state.value = 'initial';
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

    const progBarColor = computed(() => (isWorking.value ? '#67e8f9' : '#6ee7b7'));
    const progBarLayerColor = computed(() => (isWorking.value ? '#cffafe' : '#d1fae5'));

    const notice = computed(() => {
      if (state.value === 'final') {
        return 'Mission completed';
      }
      const completedSets = `Completed sets ${currentSet.value}/${props.sets.length}.`;
      const completedReps = `Completed reps ${currentRep.value}/${
        props.sets[currentSet.value].reps
      }.`;
      return isWorking.value ? `${completedSets} ${completedReps}` : 'Break';
    });

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
      progBarColor,
      progBarLayerColor,
      notice,
      onRestart,
      onStart,
      onPause,
    };
  },
};
</script>

<template>
  <div class="main-tab">
    <div class="main-tab__notice-wrap">
      <NoticeBar :text="notice" left-icon="info-o" color="#06b6d4" background="#cffafe" />
    </div>
    <ProgressBar
      :current-rate="currentRate"
      :color="progBarColor"
      :color-layer="progBarLayerColor"
      class="main-tab__progress-bar"
    />
    <ControlPanel :state="state" @restart="onRestart" @start="onStart" @pause="onPause" />
  </div>
</template>

<style lang="postcss">
.main-tab {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__notice-wrap {
    padding-top: 12px;
  }

  &__progress-bar {
    flex: 1;
  }
}
</style>
