/**
  GitHub Repo Widget
  2010-05-12 / (http://github.com/h3h/github-repo-widget)
**/
GHWidget = (function () {

  var GH_API_URL = "http://github.com/api/v2/json/repos/show/";
  var WIDGET_TEMPLATE = "forks:{forks}\
  ";
  var id, repo;

  // *-* public methods *-*

  var init = function(s_id, s_repo) {
    id = s_id; repo = s_repo;
    var elScript = document.createElement("script");
    elScript.src = GH_API_URL + repo + "?callback=GHWidget.receive";
    document.getElementsByTagName("head")[0].appendChild(elScript);
  };

  var receive = function (data) {
    console.log("Received: %o", data);
    var el = document.getElementById(id);
    if (data && data.repository) {
      el.innerHTML = WIDGET_TEMPLATE.replace(/\{(\w+)\}/, function (_, m) {
        return data.repository[m];
      });
    }
    else {
      el.parentNode.removeChild(el);
    }
  };

  // *-* utility methods *-*

  return {
    receive: receive,
    init: init
  };
})();
