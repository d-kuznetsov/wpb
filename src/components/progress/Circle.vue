<script>
import { Circle } from 'vant';

export default {
  props: {
    rate: {
      type: Number,
      default: 100,
    },
    currentRate: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Circle,
  },
  setup() {},
};
</script>

<template>
  <div class="Circle">
    <Circle
      fill="#ebedf0"
      size="220px"
      :current-rate="currentRate"
      :rate="rate"
      :stroke-width="60"
      text="Custom Width"
    />
  </div>
</template>

<style lang="postcss">
.Circle {
  display: flex;
  justify-content: center;
}
</style>
