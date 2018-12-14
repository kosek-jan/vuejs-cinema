import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
    el: '#app',
    data(){
        return {
            genre: [],
            time: []
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
        'movie-list': {
            template:   `<div id="movie-list">
                            <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }}</div>
                        </div>`,
            data(){
                return {
                    movies: [
                        {title: 'Pulp Fiction', genre: genres.CRIME},
                        {title: 'Home Alone', genre: genres.COMEDY},
                        {title: 'Austin Powers', genre: genres.COMEDY},
                    ],
                }
            },
            props: [ 'genre', 'time'],
            methods:{
                moviePassesGenreFilter(movie){
                    if(!this.genre.length){
                        return true;
                    }
                    return this.genre.find(genre => movie.genre === genre);
                }
            },
            computed: {
                filteredMovies(){
                    return this.movies.filter(this.moviePassesGenreFilter);
                }
            }
        },
        'movie-filter': {
            data(){
                return {
                    genres
                }
            },
            template:   `<div id="movie-filter">
                                <h2>Filter results</h2>
                                <div class="filter-group">
                                    <check-filter v-for="genre in genres" :title="genre" @check-filter="checkFilter"></check-filter>
                                </div>
                            </div>`,
            methods:{
                checkFilter(catergory, title, checked){
                    this.$emit('check-filter', catergory, title, checked);
                }
            },
            components: {
                'check-filter': {
                    data(){
                        return {
                            checked: false,
                        }
                    },
                    props: ['title'],
                    template: `<div :class="{'check-filter': true, active: checked}" @click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    methods:{
                        checkFilter(){
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});