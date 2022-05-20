$(document).ready(function(){
    $('#scroll').click(function(){
        jQuery("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
});