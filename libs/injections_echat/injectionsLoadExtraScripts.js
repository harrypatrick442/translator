
            function injectionsLoadExtraScripts () {
                var ticks = String(new Date().getTime());
                var paths = [];

                if (!com.echat.shared.authentication || !com.echat.shared.authentication.Controller) {
                    paths.push('http://e-chat.co/scripts/shared/authentication/authentication.controller.js?v=' + ticks);
                }
                if (!com.echat.shared.authentication || !com.echat.shared.authentication.Interface) {
                    paths.push('http://e-chat.co/scripts/shared/authentication/authentication.interface.js?v=' + ticks);
                }
                for (var i = 0; i < paths.length; i++) {
                    var path = paths[i];
                    var xhrObj = createXMLHTTPObject();
                    // open and send a synchronous request
                    xhrObj.open('GET', path, false);
                    xhrObj.send('');
                    // add the returned content to a newly created script tag
                    var se = document.createElement('script');
                    se.type = "text/javascript";
                    se.text = xhrObj.responseText;
                    console.log(se);
                    document.getElementsByTagName('head')[0].appendChild(se);
                }
                console.log(com.echat.shared.authentication);
            }