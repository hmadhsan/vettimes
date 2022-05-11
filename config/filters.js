import Vue from "vue";

function _padStart(value, len = 2, key = "0") {
  return value.toString().padStart(len, key);
}

Vue.filter("padStart", (value, len) => {
  if (!value) return value;
  return _padStart(value, len, "0");
});

Vue.filter("capitalize", value => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

Vue.filter("currency", value => {
  if (!value || isNaN(parseFloat(value))) return "";
  return "$" + parseFloat(value).toFixed(2);
});

Vue.filter("timeToDate", (value, full = false) => {
  if (!value || isNaN(parseInt(value))) return "";
  let extra = "",
    date = new Date(parseInt(value) * 1000);

  if (full) {
    extra = " "+ _padStart(date.getHours()) +":"+_padStart(date.getMinutes())
  }

  return _padStart(date.getDate()) +"."+
    _padStart(date.getMonth()+1) +"."+
    _padStart(date.getFullYear().toString().substr(2)) + extra;
});
