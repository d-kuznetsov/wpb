<script>
import { computed } from 'vue';
import { Button } from 'vant';

export default {
  props: ['state'],
  emits: ['stop', 'start', 'pause'],
  components: {
    Button,
  },
  setup(props, { emit }) {
    const isStopDisabled = computed(() => props.state === 'init');
    const isStartDisabled = computed(() => props.state === 'run');
    const isPauseDisabled = computed(() => props.state !== 'run');

    const onStopClick = () => emit('stop');
    const onStartClick = () => emit('start');
    const onPauseClick = () => emit('pause');

    return {
      isStopDisabled,
      isStartDisabled,
      isPauseDisabled,
      onStopClick,
      onStartClick,
      onPauseClick,
    };
  },
};
</script>

<template>
  <div class="control-panel">
    <Button
      icon="stop-circle-o"
      type="primary"
      size="large"
      round
      :disabled="isStopDisabled"
      @click="onStopClick"
    >
      Stop
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
