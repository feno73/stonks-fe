import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataView from 'primevue/dataview';
import ToastService from 'primevue/toastservice';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Panel from 'primevue/panel';
import Card from 'primevue/card';


import App from './App.vue';
import router from './router';
import store from './store';

import './style.css'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});
app.use(ToastService);
app.use(router);
app.use(store);

app.component("Button", Button);
app.component("Toast", Toast);
app.component("DataView", DataView);
app.component("Tag", Tag);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Panel", Panel);
app.component("Card", Card);


app.mount('#app');
