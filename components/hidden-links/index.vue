<template>
    <div>
<a v-if="courses" v-for="(item, index) in array" :href="`${cpdBaseUrl}/courses?page=${index+1}`">{{index+1}}</a>
<a v-if="courseproviders" v-for="(item, index) in array" :href="`${cpdBaseUrl}/course-providers?page=${index+1}`">{{index+1}}</a>
<a v-if="providers" v-for="(item, index) in array" :href="`${cpdBaseUrl}/providers?q=&page=${index+1}`">{{index+1}}</a>    
    </div>                                                  
</template>

<script>
import { cpdBaseUrl } from '~/config/constants'
    export default {
        props: ['total','courses','courseproviders','providers'],
        data(){
            return {
                array:[],
                cpdBaseUrl
            }
        },
        created(){
            let n = Math.ceil(this.total/20)
            this.array = Array.from(Array(n).keys())
        }
    }
</script>