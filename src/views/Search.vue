<template>
    <div>
        <UncleBreadcrumb v-if="breadcrumbObject" class="search-breadcrumb" :breadcrumb="breadcrumbObject.name" />
        <UncleModal v-for="(modal, mindex) in modals" :modal-obj=modal :key="mindex"/>
        <div class="search-container d-flex justify-content-between justify-content-md-start">
            <div class="col-10 col-md-5 pr-0 pl-0">
                <UncleSearchText v-model="searchText"/>
            </div>
            <div class="pl-0 pl-md-3 col-2 pr-0 d-flex justify-content-end justify-content-md-start filter-button">
                <UncleFilterModal ref="filter" v-if="filterObject" v-show="filtersVisible" @initialized='updateFilters' @submit='updateFilters' :filter="filterObject.name" />
            </div>
        </div>
        <div class="list-token">
            <UncleListToken v-show="filtersVisible" @removed='removeToken($event)' :items='tokensList' />
        </div>
        <div class="list-table">
            <UncleListTable v-if="listObject && listObject.type == 'table'" :list="listObject.name" :params="params"></UncleListTable>
        </div>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        data() {
            return {
                items: [],
                filters: {},
                searchText: '',
                tokensList: [],
                params: {},
                filtersVisible: false,
                breadcrumbObject: null,
                filterObject: null,
                listObject: null,
                modals: null
            }
        },
        methods: {
            init() {
                this.listObject = this.getComponents('List').pop();
                this.filterObject = this.getComponents('Filter').pop();
                this.breadcrumbObject = this.getComponents('Breadcrumb').pop();
                this.modals = this.getComponents('Modal').toArray();
                if (this.filterObject) {
                    this.initializeFilters();
                }
            },
            removeToken(token) {
                if (this.$refs.filter) {
                    this.$refs.filter.removeFilter(token.name);
                    this.loadTokenList();
                    this.loadParams();
                }
            },
            initializeFilters() {
                this.filterFields = this.filterObject.getFields();
                this.filterFieldsMap = this.filterFields.reduce((previous, row) => {
                    previous[row.name] = row;
                    return previous;
                }, {});
                this.filtersVisible = this.filterFields.filter((field) => {
                    return field.type != 'text';
                }).length > 0;
            },
            updateFilters(filterValue) {
                this.filters = filterValue;
                this.loadTokenList();
                this.loadParams();
            },
            loadTokenList() {
                this.tokensList = this.$refs.filter ? this.$refs.filter.getSummary().filter((token) => {
                    const tokenName = token.name.replace(/\[.*?\]/g, '');
                    return this.filterFieldsMap && this.filterFieldsMap[tokenName].type != 'text';
                }) : [];
            },
            loadParams() {
                this.params = this.$refs.filter ? this.$refs.filter.getParams(this.searchText) : {};
            }
        },
        watch: {
            searchText: async function(val) {
                this.loadParams(val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .token-box{
        text-align:left;
    }
    .search-container {
        margin-bottom: 20px;
    }
    .list-token {
        margin-bottom: 30px;
    }

    .list-table .card{
        overflow-x: scroll;  
    }
    .search-breadcrumb {
        margin-bottom:30px;
    }
</style>