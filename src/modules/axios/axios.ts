import axios, { AxiosStatic } from 'axios'
import { App } from 'vue';
import VueAxios from 'vue-axios'

export default {
    setup:(app: App) => {
        function load(): AxiosStatic{
            axios.defaults.timeout = 5000
            axios.defaults.headers.common.Accept = 'application/json'
            axios.defaults.headers.common.ContentType = 'application/json'

            return axios
        }

        const ax = load();
        app.use(VueAxios, ax)
    }
}