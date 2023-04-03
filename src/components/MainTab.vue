<script>
import { ref, computed, watch } from 'vue';
import { useState, APP_STATE } from '../composable/state';
import { NoticeBar } from 'vant';
import ProgressBar from './ProgressBar.vue';
import ControlPanel from './ControlPanel.vue';

const PERIOD = 40;

export default {
  components: {
    NoticeBar,
    ProgressBar,
    ControlPanel,
  },
  props: ['exercises'],
  setup(props) {
    //const state = ref(APP_STATE.INITIAL);
    const { state, setState } = useState();
    const currentExercise = ref(0);
    const currentSet = ref(0);
    const isWorking = ref(true);
    const currentRate = ref(0);
    const step = computed(() => {
      const key = isWorking.value ? 'on' : 'off';
      const duration = props.exercises[currentExercise.value][key];
      return (100 * PERIOD) / (duration * 1000);
    });

    const progBarColor = computed(() => (isWorking.value ? '#67e8f9' : '#6ee7b7'));
    const progBarLayerColor = computed(() => (isWorking.value ? '#cffafe' : '#d1fae5'));

    const notice = computed(() => {
      if (state.value === APP_STATE.INITIAL) {
        return 'Just do it!';
      } else if (state.value === APP_STATE.FINAL) {
        return 'Mission completed!';
      }
      const exercise = `Exercise: ${currentExercise.value + 1}/${props.exercises.length}.`;
      const set = `Set ${currentSet.value + 1}/${props.exercises[currentExercise.value].sets}.`;
      return isWorking.value ? `${exercise} ${set}` : 'Break';
    });

    const onRestart = () => {
      //state.value = APP_STATE.INITIAL;
      setState(APP_STATE.INITIAL);
      currentExercise.value = 0;
      currentSet.value = 0;
      isWorking.value = true;
      currentRate.value = 0;
    };
    const onStart = () => {
      //state.value = APP_STATE.RUN;
      setState(APP_STATE.RUN);
    };
    const onPause = () => {
      //state.value = APP_STATE.PAUSE;
      setState(APP_STATE.PAUSE);
    };

    const run = () => {
      currentRate.value += step.value;
      if (currentRate.value >= 100) {
        if (isWorking.value) {
          isWorking.value = false;
        } else {
          isWorking.value = true;
          if (currentSet.value + 1 === props.exercises[currentExercise.value].sets) {
            if (currentExercise.value + 1 === props.exercises.length) {
              //state.value = APP_STATE.FINAL;
              setState(APP_STATE.FINAL);
            } else {
              currentSet.value = 0;
              currentExercise.value++;
            }
          } else {
            currentSet.value++;
          }
        }
        if (state.value !== APP_STATE.FINAL) {
          currentRate.value = 0;
        }
      }
    };

    let intervalId;
    watch(state, (value) => {
      if (value === APP_STATE.RUN) {
        intervalId = setInterval(run, PERIOD);
      } else {
        clearInterval(intervalId);
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
  box-sizing: border-box;

  &__notice-wrap {
    padding-top: 12px;
  }

  &__progress-bar {
    flex: 1;
  }
}
</style>
