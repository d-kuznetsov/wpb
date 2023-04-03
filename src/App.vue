<script>
import { ref, computed, watch } from 'vue';
import { ConfigProvider } from 'vant';
import defaultSettings from './default-settings';
import MainTab from './components/MainTab.vue';
import SettingTab from './components/SettingTab.vue';
import Tabs from './components/Tabs.vue';

const STORAGE_KEY = 'APP_SETTINGS';

export default {
  components: {
    ConfigProvider,
    MainTab,
    SettingTab,
    Tabs,
  },
  setup() {
    const settingsStr = ref(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultSettings));
    const settings = computed(() => {
      return JSON.parse(settingsStr.value);
    });

    watch(settingsStr, (value) => {
      localStorage.setItem(STORAGE_KEY, value);
    });

    return {
      settingsStr,
      settings,
    };
  },
};
</script>

<template>
  <ConfigProvider theme="dark">
    <div class="app">
      <Tabs>
        <template v-slot:main>
          <MainTab :exercises="settings.workout.exercises" />
        </template>
        <template v-slot:settings>
          <SettingTab v-model="settingsStr" />
        </template>
      </Tabs>
    </div>
  </ConfigProvider>
</template>

<style lang="postcss">
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
</style>
