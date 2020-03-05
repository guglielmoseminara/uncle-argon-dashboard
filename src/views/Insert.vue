<template>
    <div>
        <UncleBreadcrumb v-if="breadcrumbObject" class="insert-breadcrumb" :breadcrumb="breadcrumbObject.name"/>
        <UncleForm v-if="formObject" :form='formObject.name'/>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        methods: {
            init() {
                this.formObject = this.getComponents('Form').pop();
                this.breadcrumbObject = this.getComponents('Breadcrumb').pop();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .insert-breadcrumb {
        margin-bottom:30px;
    }
</style>