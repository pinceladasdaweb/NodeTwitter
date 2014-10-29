# NodeTwitter
> Display your latest tweets with Node.js and VanillaJS

![](https://raw.github.com/pinceladasdaweb/NodeTwitter/master/screenshot.png)

## Demo
Access [the url](http://nodejs-twitter.herokuapp.com/) and view in action.

## How to use?
NodeTwitter is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. It is a very simple example of how to get your latest updates on Twitter with Node.js and show the customer with pure JavaScript.

1 - Open the file [`views/index.ejs`](views/index.ejs), at the end of the same look for the code block below and fill in your details:

```javascript
(function(window, document, undefined) {
    NodeTwitter.init({
        username: 'pinceladasdaweb',
        container: '#stream',
        counter: 12
    });
}(window, document));
```

You can also load the script via AMD:

```javascript
require(["/path/to/app.min"], function(NodeTwitter) {
    NodeTwitter.init({
        username: 'pinceladasdaweb',
        container: '#stream',
        counter: 12
    });
});
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

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## License
NodeTwitter is licensed under the MIT License.
