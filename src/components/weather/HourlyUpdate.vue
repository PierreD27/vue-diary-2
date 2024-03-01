<script lang="ts" setup>
import { ref, onMounted } from 'vue'
interface Props {
  hour: string
  condition: string
  icon_path: string
  temp_c: number
  temp_f: number
  is_day: number
  isCel: boolean
}

const props = defineProps<Props>()
const imageUrl = ref('')
onMounted(() => {
  imageUrl.value = new URL(`/src/assets/${props.icon_path}`, import.meta.url).href
})
</script>

<template>
  <div class="hour-wrapper">
    <p>{{ hour }}</p>
    <img v-if="imageUrl" :src="imageUrl" />
    <p v-if="isCel">{{ Math.round(temp_c) }}°C</p>
    <p v-else>{{ Math.round(temp_f) }}°F</p>
  </div>
</template>

<style lang="scss" scoped>
.hour-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #1e4258;
  padding: 0.3rem 0.7rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 0.5rem;

  img {
    width: 90%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;

    @media screen and (max-width: 720px) {
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
    }
  }
  p {
    text-align: center;
  }
}
</style>
