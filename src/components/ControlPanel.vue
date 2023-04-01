<script>
import { computed } from 'vue';
import { Col, Row, Button } from 'vant';

export default {
  props: ['state'],
  emits: ['stop', 'start', 'pause'],
  components: {
    Row,
    Column: Col,
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
    <Row gutter="12">
      <Column span="8">
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
      </Column>
      <Column span="8">
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
      </Column>
      <Column span="8">
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
      </Column>
    </Row>
  </div>
</template>

<style lang="postcss">
.control-panel {
  padding: 12px;
  border-top: 1px solid grey;
}
</style>
