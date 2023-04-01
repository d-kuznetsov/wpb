<script>
import { computed } from 'vue';
import { Button } from 'vant';

export default {
  props: ['state'],
  emits: ['restart', 'start', 'pause'],
  components: {
    Button,
  },
  setup(props, { emit }) {
    const isRestartDisabled = computed(() => props.state === 'init');
    const isStartDisabled = computed(() => props.state === 'run');
    const isPauseDisabled = computed(() => props.state !== 'run');

    const onRestartClick = () => emit('restart');
    const onStartClick = () => emit('start');
    const onPauseClick = () => emit('pause');

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
      icon="replay"
      type="primary"
      size="large"
      round
      :disabled="isRestartDisabled"
      @click="onRestartClick"
    >
      Restart
    </Button>

    <Button
      icon="play-circle-o"
      type="primary"
      size="large"
      round
      :disabled="isStartDisabled"
      @click="onStartClick"
    >
      Start
    </Button>

    <Button
      icon="pause-circle-o"
      type="primary"
      size="large"
      round
      :disabled="isPauseDisabled"
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
</style>
