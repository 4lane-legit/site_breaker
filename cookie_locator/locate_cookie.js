function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

function extractCookies(cookie) {
    var output = {};
    cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join('=');
    });
    var json = JSON.stringify(output, null, 4);
    return json;
  }

  
  eval(`(function extractCookies(cookie) { var output = {}; cookie.split(/\s*;\s*/).forEach(function(pair) { pair = pair.split(/\s*=\s*/); output[pair[0]] = pair.splice(1).join('='); }); var json = JSON.stringify(output, null, 4); return json; })(document.cookie);`);