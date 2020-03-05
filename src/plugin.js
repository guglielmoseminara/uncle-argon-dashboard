import {
    UncleDashboardDetailPage,
    UncleDashboardInsertPage,
    UncleDashboardSearchPage,
    UncleDashboardLoginPage,
    UncleDashboardScheletonPage,
    UncleDashboardPasswordRecoveryPage,
    UncleDashboardPasswordResetPage,
    UncleDashboardOutPage,
} from './views';

import {
    UncleUserService
} from './services';

import LanguageObject from './language';

export default {
    install(Vue, options) {
        Vue.component('UncleDashboardScheletonPage', UncleDashboardScheletonPage);
        Vue.component('UncleDashboardLoginPage', UncleDashboardLoginPage);
        Vue.component('UncleDashboardInsertPage', UncleDashboardInsertPage);
        Vue.component('UncleDashboardSearchPage', UncleDashboardSearchPage);
        Vue.component('UncleDashboardDetailPage', UncleDashboardDetailPage);
        Vue.component('UncleDashboardPasswordRecoveryPage', UncleDashboardPasswordRecoveryPage);
        Vue.component('UncleDashboardPasswordResetPage', UncleDashboardPasswordResetPage);
        Vue.component('UncleDashboardOutPage', UncleDashboardOutPage);
        const app = Vue.prototype.$uncle.getApp();
        app.serviceManager.registerService('UncleUserService', new UncleUserService(Vue.prototype.$uncle));
        const languageProvider = app.serviceManager.getLanguageProvider();
        languageProvider.merge(LanguageObject);
    }
}