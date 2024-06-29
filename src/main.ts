import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataView from 'primevue/dataview';
import ToastService from 'primevue/toastservice';
import Tag from 'primevue/tag';

import App from './App.vue';
import router from './router';
import store from './store';

import './style.css'
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue, { theme: { preset: Aura } });
app.use(ToastService);
app.use(router);
app.use(store);

app.component("Button", Button);
app.component("Toast", Toast);
app.component("DataView", DataView);
app.component("Tag", Tag);


app.mount('#app');
