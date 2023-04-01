<script>
import { ref } from 'vue';
import { Col, Row, Button } from 'vant';
import { computed } from '@vue/reactivity';

export default {
  props: {
    state: {
      type: String,
    },
  },
  emits: ['stop', 'start', 'pause'],
  components: {
    Row,
    Column: Col,
    Btn: Button,
  },
  setup(props, { emit }) {
    const stopBtnDisabled = computed(() => {
      return props.state === 'init';
    });
    const startBtnDisabled = computed(() => {
      return props.state === 'run';
    });
    const pauseBtnDisabled = computed(() => {
      return props.state !== 'run';
    });

    const onStopClick = () => {
      emit('stop');
    };
    const onStartClick = () => {
      emit('start');
    };
    const onPauseClick = () => {
      emit('pause');
    };
    return {
      stopBtnDisabled,
      startBtnDisabled,
      pauseBtnDisabled,
      onStopClick,
      onStartClick,
      onPauseClick,
    };
  },
};
</script>

<template>
  <div class="ControlPanel">
    <Row gutter="12">
      <Column span="8">
        <Btn
          icon="stop-circle-o"
          type="primary"
          size="large"
          round
          :disabled="stopBtnDisabled"
          @click="onStopClick"
          >Stop</Btn
        >
      </Column>
      <Column span="8">
        <Btn
          icon="play-circle-o"
          type="primary"
          size="large"
          round
          :disabled="startBtnDisabled"
          @click="onStartClick"
          >Start</Btn
        >
      </Column>
      <Column span="8">
        <Btn
          icon="pause-circle-o"
          type="primary"
          size="large"
          round
          :disabled="pauseBtnDisabled"
          @click="onPauseClick"
          >Pause</Btn
        >
      </Column>
    </Row>
  </div>
</template>

<style lang="postcss">
.ControlPanel {
  padding: 12px;
  border-top: 1px solid grey;
}
</style>
