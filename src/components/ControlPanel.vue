<script>
//import { ref } from 'vue';
import { Col, Row } from 'vant';

export default {
  components: {
    Row,
    Column: Col,
  },
  setup() {},
};
</script>

<template>
  <Row>
    <Column span="8">1</Column>
    <Column span="8">2</Column>
    <Column span="8">3</Column>
  </Row>
</template>
