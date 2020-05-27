<template>
    <div>
        <UncleSidebar nav='sidebar'>
            <template slot="header">
                <slot name="logo"></slot>
                <div class="profile">
                    <div class="image text-center">
                        {{initialUser}}
                    </div>
                </div>
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

<script>
    export default {
        data() {
            return {
                initialUser: 'C'
            }
        },
        created() {
            const app = this.$uncle.getApp();
            const userService = app.serviceManager.getService('UncleUserService');
            const user = userService.getUser();
            const profile = user.profile;
            if (profile) {
                this.initialUser = profile.name.toUpperCase().charAt(0);
            } else {
                this.initialUser = user.email.toUpperCase().charAt(0);
            }
        }
    };
</script>

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

    ::v-deep .logo {
        width: 100%;
    }
    .profile{
        position:relative;
        height: 56px;
        background: #F4F8FB;
        box-shadow: inset 0px -1px 0px rgba(199, 206, 212, 0.3), inset 0px 1px 0px rgba(199, 206, 212, 0.3);
        padding-top: 10px;
        padding-left: 10px;
        margin-left: -1.5rem;
        margin-right: -1.5rem;
        margin-top:20px;
        padding-left: 25px;
    }
    @media (max-width: 768px){
        ::v-deep .logo {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width:50%;
        }
        .navbar {
            height: 70px;
            padding: 0;
        }
        .profile {
            padding: 0.25rem 0.75rem;
            margin-right: 0px;
            box-shadow: none;
            margin-top: 10px;
            background: none;
        }         
    }

    .image{
        padding-top: 5px;
        width: 35px;
        height: 35px;
        background: #65B32E;
        border: 1px solid rgba(199, 206, 212, 0.3);
        border-radius: 20px;
        box-sizing: border-box;
        color: white;
    }

</style>