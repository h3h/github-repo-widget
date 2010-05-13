/**
  GitHub Repo Widget
  2010-05-12 / (http://github.com/h3h/github-repo-widget)
**/
GHWidget = (function () {

  var GH_API_URL = "http://github.com/api/v2/json/repos/show/";
  var WIDGET_TEMPLATE = '\
    <ul class="repo-stats">\
      <li class="watchers">\
        <a href="{url}/watchers" title="Watchers">{watchers}</a>\
      </li>\
      <li class="forks">\
        <a href="{url}/network" title="Forks">{forks}</a>\
      </li>\
    </ul>\
    <h3><a href="{url}">{owner}/{name}</a></h3>\
    <div class="body">\
      <p class="description">{description}</p>\
    </div>\
  ';
  var id, repo;

  // *-* public methods *-*

  var init = function(s_id, s_repo) {
    id = s_id; repo = s_repo;
    addStyleSheet("http://h3h.github.com/github-repo-widget/widget.css");
    addScript(GH_API_URL + repo + "?callback=GHWidget.receive");
  };

  var receive = function (data) {
    console.log("Received: %o", data);
    var el = document.getElementById(id);
    el.className = (el.className + '').replace(/\bloading\b/, '');
    try {
      if (data && data.repository) {
        el.innerHTML = WIDGET_TEMPLATE.replace(/\{(\w+)\}/g, function (_, m) {
          var v = data.repository[m].toString();
          if (/^\d+$/.test(v)) {
            v = numberWithDelimiter(v);
          }
          return v;
        });
      }
      else {
        throw "No data.";
      }
    }
    catch(e) {
      el.parentNode.removeChild(el);
    }
  };

  // *-* utility methods *-*

  var addScript = function (url) {
    var elScript = document.createElement("script");
    elScript.src = url;
    document.getElementsByTagName("head")[0].appendChild(elScript);
  };

  var addStyleSheet = function (url) {
    var elStyle = document.createElement("link");
    elStyle.rel = "stylesheet";
    elStyle.href = url;
    document.getElementsByTagName("head")[0].appendChild(elStyle);
  };

  var numberWithDelimiter = function (v) {
    return v.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
  };

  return {
    receive: receive,
    init: init
  };
})();
