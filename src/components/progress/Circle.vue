<script>
import { Circle } from 'vant';

export default {
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
      current-rate="30"
      rate="30"
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
