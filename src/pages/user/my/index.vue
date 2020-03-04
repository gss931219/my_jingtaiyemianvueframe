<template>
    <div>我的</div>
</template>

<script>
    export default {
        name: "my",
        mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>

</style>
