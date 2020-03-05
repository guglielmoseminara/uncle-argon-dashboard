<template>
    <div>
        <UncleBreadcrumb v-if="breadcrumbObject" v-show="item" class="detail-breadcrumb" :breadcrumb="breadcrumbObject.name" :params="item"/>
        <UncleForm @itemLoaded = "itemLoaded" v-if="formObject" :form='formObject.name' :params="params"/>
        <UncleSummary @itemLoaded = "itemLoaded" v-if="summaryObject" :summary='summaryObject.name' :params="params"/>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        data() {
            return {
                item: null
            }
        },
        methods: {
            itemLoaded(item) {
                this.item = item
            },
            init() {
                this.formObject = this.getComponents('Form').pop();
                this.summaryObject = this.getComponents('Summary').pop();
                this.breadcrumbObject = this.getComponents('Breadcrumb').pop();
                this.params = this.$route.params;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .detail-breadcrumb {
        margin-bottom:30px;
    }
</style>