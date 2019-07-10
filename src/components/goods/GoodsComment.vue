<template>
    <comment :id="id"></comment>
</template>

<script>
    import comment from '../subcomponents/Comment.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id
            }
        },
        components: {
            comment
        }
    }
</script>

<style scoped lang="scss">

</style>