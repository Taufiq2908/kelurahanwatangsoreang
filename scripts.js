
      window.onerror = function(msg, url, line, col, error) {
        if(url && url.indexOf('userCodeAppPanel') > -1 && line) {
           var html = document.documentElement.outerHTML;
           var lines = html.split('\n');
           var failingLine = lines[line - 1] || "Line not found";
           alert("CRITICAL ERROR: " + msg + "\nLine " + line + ":\n" + failingLine);
        } else {
           alert("CRITICAL ERROR: " + msg + " at line " + line + ":" + col);
        }
      };
    
