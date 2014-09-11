# NodeTwitter
> Display your latest tweets with Node.js and VanillaJS

![](https://raw.github.com/pinceladasdaweb/NodeTwitter/master/screenshot.png)

## Demo
Access [the url](http://nodejs-twitter.herokuapp.com/) and view in action.

## How to use?
NodeTwitter is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. It is a very simple example of how to get your latest updates on Twitter with Node.js and show the customer with pure JavaScript.

1 - Open the file [`views/index.ejs`](index.ejs), at the end of the same look for the code block below and fill in your details:

```javascript
(function(window, document, undefined) {
    NodeTwitter.init({
        username: 'pinceladasdaweb',
        container: '#stream',
        counter: 12
    });
}(window, document));
```
2 - In the [`config.js`](config.js) file, complete the [Twitter OAuth settings](https://dev.twitter.com/oauth/overview/faq):

```javascript
module.exports = {
    twitter: {
        consumer_key: '',
        consumer_secret: '',
        access_token: '',
        access_token_secret: ''
    }
};
```

## Browser support
IE9+ and modern browsers.

## License
NodeTwitter is licensed under the MIT License.