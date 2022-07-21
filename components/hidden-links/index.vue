<template>
    <div>

<a v-if="courses" v-for="(item, index) in array" :href="`http://cpdlocal.vettimes.co.uk:3000/courses?page=${index+1}`">{{index+1}}</a>
<a v-if="courseproviders" v-for="(item, index) in array" :href="`http://cpdlocal.vettimes.co.uk:3000/course-providers?page=${index+1}`">{{index+1}}</a>
<a v-if="providers" v-for="(item, index) in array" :href="`http://cpdlocal.vettimes.co.uk:3000/providers?q=&page=${index+1}`">{{index+1}}</a>    
    </div>                                                  
</template>

<script>
    export default {
        props: ['total','courses','courseproviders','providers'],
        data(){
            return {
                array:[]
            }
        },
        created(){
            let n = Math.ceil(this.total/20)
            this.array = Array.from(Array(n).keys())
        }
    }
</script>