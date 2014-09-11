var Browser = (function () {
    var agent = navigator.userAgent;
    return {
        ie: agent.match(/MSIE\s([^;]*)/)
    };
}());

(function (window, document, undefined) {
    "use strict";

    var NodeTwitter = function (options) {
        if (!this || !(this instanceof NodeTwitter)) {
            return new NodeTwitter(options);
        }

        if (typeof options === 'string') {
            options = { key : options };
        }

        this.username  = options.username;
        this.container = options.container;
        this.counter   = options.counter || 10;
        this.endpoint  = '/tweets?user=' + this.username + '&counter=' + this.counter + '';

        this.fetch();
    };

    NodeTwitter.init = function (options) {
        return new NodeTwitter(options);
    };

    NodeTwitter.prototype = {
        fetch: function () {
            this.getJSON(this.endpoint, this.loadTweets);
        },
        getJSON: function (path, callback) {
            var xhttp = new XMLHttpRequest(),
                self  = this;

            xhttp.open('GET', path, true);
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    var json = JSON.parse(xhttp.responseText);
                    callback.call(self, json);
                }
            };
            xhttp.send();
        },
        loop: function (els, callback) {
            var i = 0, max = els.length;
            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        loadTweets: function (tweets) {
            var self     = this,
                timeline = document.querySelector(this.container),
                content  = '';

            this.loop(tweets, function (tweet) {
                var text       = tweet.text,
                    created    = self.prettyDate(tweet.created_at),
                    screenname = self.username,
                    profile    = tweet.user.profile_image_url_https;

                content += '<div class="item clerfix"><img alt="' + screenname + '" src="' + profile + '"><p>' + self.twitterLinks(text) + '</p><p>' + self.prettyDate(created) + '</p><cite>@' + screenname + '</cite></div>';
            });

            timeline.innerHTML = content;
        },
        prettyDate: function (a) {
            var b = new Date(),
                c = new Date(a);

            if (Browser.ie) {
                c = Date.parse(a.replace(/( \+)/, ' UTC$1'));
            }

            var d = b - c,
                e = 1000,
                minute = e * 60,
                hour = minute * 60,
                day = hour * 24,
                week = day * 7;

            if (isNaN(d) || d < 0) {
                return "";
            }
            if (d < e * 7) {
                return "just now";
            }
            if (d < minute) {
                return Math.floor(d / e) + " seconds ago";
            }
            if (d < minute * 2) {
                return "1 minute ago";
            }
            if (d < hour) {
                return Math.floor(d / minute) + " minutes ago";
            }
            if (d < hour * 2) {
                return "1 hour ago";
            }
            if (d < day) {
                return Math.floor(d / hour) + " hours ago";
            }
            if (d > day && d < day * 2) {
                return "yesterday";
            }
            if (d < day * 365) {
                return Math.floor(d / day) + " days ago";
            } else {
                return "over a year ago";
            }
        },
        twitterLinks: function (text) {
            text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
                .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
                .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');
            return text;
        }
    };

    window.NodeTwitter = NodeTwitter;
}(window, document));