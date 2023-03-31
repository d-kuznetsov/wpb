<script>
//import { ref } from 'vue';
import { Col, Row, Button } from 'vant';

export default {
  components: {
    Row,
    Column: Col,
    Btn: Button,
  },
  setup() {},
};
</script>

<template>
  <div class="ControlPanel">
    <Row gutter="8">
      <Column span="8">
        <Btn icon="stop-circle-o" size="large">Stop</Btn>
      </Column>
      <Column span="8">
        <Btn icon="play-circle-o" type="primary" size="large">Start</Btn>
      </Column>
      <Column span="8">
        <Btn icon="pause-circle-o" type="primary" size="large">Pause</Btn>
      </Column>
    </Row>
  </div>
</template>

<style lang="postcss">
.ControlPanel {
  padding: 8px;
}
</style>
