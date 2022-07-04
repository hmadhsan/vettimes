<template>    
  <div>
    <div id="placement_224728_0" class="fb" >
      <div
        class="fb-page"
        data-href="https://www.facebook.com/vettimescpd/"
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
        cite="https://www.facebook.com/vettimescpd/"
        class="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/vettimescpd/">Vet Times CPD</a>
        </blockquote>

      </div>
    </div>
  </div>
</template>

<script>
export default {  
  mounted() {  
    this.fbParse();
  },
  methods: {
    fbParse: function() {
      setTimeout(() => {
        process.browser ? window?.FB?.XFBML?.parse() : null;
      }, 0);
    }
  }
}
</script>