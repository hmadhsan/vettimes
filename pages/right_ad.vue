<template>
  <div>
    <h4>advertisement</h4>
    <div id="placement_224728_0" class="ad"></div>

  </div>
</template>

<script>
export default {
  mounted() {
    let AdButler = window.AdButler || {}; AdButler.ads = AdButler.ads || [];
    let abkw = window.abkw || '';

    AdButler.ads.push({handler: function(opt){ AdButler.register(168529, 224728, [300,250], 'placement_224728_0', opt); }, opt: { place: 0, keywords: abkw, domain: 'servedbyadbutler.com', click:'CLICK_MACRO_PLACEHOLDER' }});
  }
}
</script>
