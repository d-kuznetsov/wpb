<script>
import { computed } from 'vue';
import { useState, APP_STATE } from '../composable/state';
import { Button } from 'vant';

export default {
  components: {
    Button,
  },
  setup() {
    const { state, setState } = useState();
    const isRestartDisabled = computed(() => state.value === APP_STATE.INITIAL);
    const isStartDisabled = computed(() => {
      return state.value === APP_STATE.RUN || state.value === APP_STATE.FINAL;
    });
    const isPauseDisabled = computed(() => state.value !== APP_STATE.RUN);

    const onRestartClick = () => setState(APP_STATE.INITIAL);
    const onStartClick = () => setState(APP_STATE.RUN);
    const onPauseClick = () => setState(APP_STATE.PAUSE);

    return {
      isRestartDisabled,
      isStartDisabled,
      isPauseDisabled,
      onRestartClick,
      onStartClick,
      onPauseClick,
    };
  },
};
</script>

<template>
  <div class="control-panel">
    <Button
      :disabled="isRestartDisabled"
      icon="replay"
      type="primary"
      size="large"
      round
      @click="onRestartClick"
    >
      Restart
    </Button>

    <Button
      :disabled="isStartDisabled"
      icon="play-circle-o"
      type="primary"
      size="large"
      round
      @click="onStartClick"
    >
      Start
    </Button>

    <Button
      :disabled="isPauseDisabled"
      icon="pause-circle-o"
      type="primary"
      size="large"
      round
      @click="onPauseClick"
    >
      Pause
    </Button>
  </div>
</template>

<style lang="postcss">
.control-panel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
  padding: 12px;
  border-top: 1px solid #6b7280;
}

.van-theme-dark .control-panel {
  background-color: var(--bg-color-dark);
}
</style>
