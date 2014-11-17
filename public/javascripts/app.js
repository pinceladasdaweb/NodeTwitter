(function (name, context, definition) {
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        context[name] = definition();
    }
})('NodeTwitter', this, function () {
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
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        var json = JSON.parse(this.responseText);
                        callback.call(self, json);
                    } else {
                        throw new Error(this.status+" - "+this.statusText);
                    }
                }
            };
            xhttp.send();
            xhttp = null;
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

                content += '<div class="item clerfix"><img alt="' + screenname + '" src="' + profile + '"><p>' + self.twitterLinks(text) + '</p><p>' + created + '</p><cite>@' + screenname + '</cite></div>';
            });

            timeline.innerHTML = content;
        },
        prettyDate: function (dateString) {
            var rightNow = new Date(),
                then     = new Date(dateString);

            if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
            }

            var diff   = rightNow - then,
                second = 1000,
                minute = second * 60,
                hour   = minute * 60,
                day    = hour * 24,
                week   = day * 7;

            if (isNaN(diff) || diff < 0) {
                return "";
            }
            if (diff < second * 2) {
                return "just now"
            }
            if (diff < minute) {
                return Math.floor(diff / second) + " seconds ago";
            }
            if (diff < minute * 2) {
                return "1 minute ago"
            }
            if (diff < hour) {
                return Math.floor(diff / minute) + " minutes ago";
            }
            if (diff < hour * 2) {
                return "1 hour ago";
            }
            if (diff < day) {
                return Math.floor(diff / hour) + " hours ago";
            }
            if (diff > day && diff < day * 2) {
                return "yesterday";
            }
            if (diff < day * 365) {
                return Math.floor(diff / day) + " days ago";
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

    return NodeTwitter;
});