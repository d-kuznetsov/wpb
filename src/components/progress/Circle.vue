<script>
import { computed } from 'vue';
import { Circle } from 'vant';
import { useWindowSize } from '@vant/use';

const MAX_CONTAINER_SIZE = 640;
const GAP = 120;

export default {
  props: ['current-rate'],
  components: {
    Circle,
  },
  setup(props) {
    const { width, height } = useWindowSize();
    const diameter = computed(() => {
      const screenMinSide = Math.min(width.value, height.value);
      return Math.min(screenMinSide, MAX_CONTAINER_SIZE) - GAP;
    });
    const text = computed(() => props.currentRate.toFixed(0) + '%');
    return {
      text,
      diameter,
    };
  },
};
</script>

<template>
  <div class="progress-bar">
    <Circle
      fill="#ebedf0"
      :size="diameter"
      :current-rate="currentRate"
      :rate="100"
      :stroke-width="60"
      :text="text"
    />
  </div>
</template>

<style lang="postcss">
.progress-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
