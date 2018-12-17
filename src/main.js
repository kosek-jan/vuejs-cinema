import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get(){ return this.$root.moment}});

new Vue({
    el: '#app',
    data(){
        return {
            genre: [],
            time: [],
            movies: [],
            moment,
            day: moment()
        }
    },
    methods:{
        checkFilter(catergory, title, checked){
            if(checked){
                this[catergory].push(title);
            }else{
                let index = this[catergory].indexOf(title);
                if(index > -1){
                    this[catergory].splice(index, 1);
                }
            }
        }
    },
    components: {
        MovieList,
        MovieFilter,
    },
    created(){
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        })
    }
});