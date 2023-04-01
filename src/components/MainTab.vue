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
    exercises: {
      default: settings.exercises,
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

    const currentExercise = ref(0);
    const currentSet = ref(0);
    const isWorking = ref(true);
    const step = computed(() => {
      const key = isWorking.value ? 'on' : 'off';
      const duration = props.exercises[currentExercise.value][key];
      return (100 * PERIOD) / (duration * 1000);
    });
    const currentRate = ref(0);

    const onRestart = () => {
      state.value = 'initial';
      currentExercise.value = 0;
      currentSet.value = 0;
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
      const completedExercises = `Completed exercises ${currentExercise.value}/${props.exercises.length}.`;
      const completedSets = `Completed sets ${currentSet.value}/${
        props.exercises[currentExercise.value].sets
      }.`;
      return isWorking.value ? `${completedExercises} ${completedSets}` : 'Break';
    });

    watch(tick, () => {
      currentRate.value += step.value;
      if (currentRate.value >= 100) {
        if (isWorking.value) {
          isWorking.value = false;
        } else {
          isWorking.value = true;
          if (currentSet.value + 1 === props.exercises[currentExercise.value].sets) {
            if (currentExercise.value + 1 === props.exercises.length) {
              state.value = 'final';
            } else {
              currentSet.value = 0;
              currentExercise.value++;
            }
          } else {
            currentSet.value++;
          }
        }
        if (state.value !== 'final') {
          currentRate.value = 0;
        }
      }
    });

    return {
      state,
      currentExercise,
      currentSet,
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
