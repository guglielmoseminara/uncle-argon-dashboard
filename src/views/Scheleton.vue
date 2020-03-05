<template>
    <div>
        <UncleSidebar nav='sidebar'>
            <template slot="header">
                <slot name="logo"></slot>
            </template>
        </UncleSidebar>
        <div class="app-content">
            <div class="app-content-primary"></div>
            <div class="app-content__container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .app-content {
        position:relative;
        &__container {
            position:absolute;
            top:25px;
            left:30px;
            right:30px;
        }
    }
    .app-content-primary {
        height:350px; 
        width:100%; 
        background:#3382D4; 
        z-index: 0
    }
</style>