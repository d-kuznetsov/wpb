<script>
import { computed } from 'vue';
import { Progress, stepsProps } from 'vant';

export default {
  props: {
    sets: {
      type: Array,
    },
    curSet: {
      type: Number,
    },
    curRep: {
      type: Number,
    },
  },
  components: {
    Progress,
  },
  setup(props) {
    exPercentage = computed(() => {
      return (100 / props.sets.length) * props.curSet;
    });
    setPercentage = computed(() => {
      return (100 / props.set[props.curSet].reps) * props.curRep;
    });
  },
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
