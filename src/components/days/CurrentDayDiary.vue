<script setup lang="ts">
interface Props {
    time:string,
    activity:string
    
}

defineProps<Props>()


</script>

<template>
    <div class="to-do-item-wrapper">
       <p> {{ time }}: {{ activity }} </p>
    </div>

</template>

<style scoped lang="scss">
.to-do-item-wrapper{
    background: rgb(14, 168, 168);
    padding: 0.5rem 0.7rem;
    border-radius: 0.7rem;

    
}



</style>