<template>
    <UncleDashboardOutPage>
        <div class="text-center">
            <slot name="logo"></slot>
            <p class="auth-text mt-4">Inserisci la nuova password</p>
        </div>
        <UncleForm form="resetPassword" ref="form" @input="updateForm($event)"/>
        <div class="mt-3">
            <div style="float:left; padding-top:12px">
                <a href="#" class="auth-link" @click="goToLogin">Torna al login</a>
            </div>
            <UncleButton
                @click=actionClick 
                type="primary" 
                style="float:right"
                :loading="loading"
            >
                Invia
            </UncleButton>
        </div>
    </UncleDashboardOutPage>
</template>
<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        data() {
            return {
                submitted: false,
                formValue: null,
                formScope: null,
                loading: false,
            }
        },
        methods: {
            updateForm(event) {
                this.formValue = event;
            },
            async actionClick() {
                this.loading = true;
                const form = this.$refs.form;
                await form.validateForm();
                if (!form.hasFormErrors()) {
                    await form.submit();
                }
                this.loading = false;
            },
            goToLogin(){
                const action = this.$uncle.getAction('goToLogin');
                action.execute();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .auth-text {
        font-weight: bold;
        font-size: 20px;
    }
</style>
