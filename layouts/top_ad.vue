<template>
  <div>
    <div id="placement_213795_0" style="text-align:center"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    let AdButler, abkw;

    process.browser ? AdButler =  window.AdButler || {} : null ;
    
    process.browser ? AdButler.ads = AdButler.ads || [] : null;
    
    process.browser ?  abkw = window.abkw || '' : null;


    AdButler.ads.push({handler: function(opt){ AdButler.register(168529, 213795, [728,90], 'placement_213795_0', opt); }, opt: { place: 0, keywords: abkw, domain: 'servedbyadbutler.com', click:'CLICK_MACRO_PLACEHOLDER' }});
  }
}
</script>
