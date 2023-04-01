<script>
import MainTab from './components/MainTab.vue';
import Tabs from './components/Tabs.vue';

export default {
  components: {
    MainTab,
    Tabs,
  },
};
</script>

<template>
  <div class="App">
    <Tabs>
      <template v-slot:main>
        <MainTab />
      </template>
    </Tabs>
  </div>
</template>

<style lang="postcss">
.App {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  outline-style: dotted;
}
</style>
