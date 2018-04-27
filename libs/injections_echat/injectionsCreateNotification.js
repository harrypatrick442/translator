function injectionsCreateNotification(title, obj, tag) {
                obj.tag = tag;
                var notification = new Notification(title, obj);
                notification.addEventListener("click", function(e) {
                    window.postMessage({
                        type: 'notificationClick',
                        tag: e.target.tag
                    }, "*");
                });
                notification.addEventListener("error", function(e) {
                    window.postMessage({
                        type: 'notificationError',
                        tag: e.target.tag
                    }, "*");
                });
                notification.addEventListener("close", function(e) {
                    delete notifications[obj.tag];
                    window.postMessage({
                        type: 'notificationClose',
                        tag: e.target.tag
                    }, "*");
                });
                for (var i in obj) {
                    notification[i] = obj[i];
                }
                notifications[tag] = notification;
            }