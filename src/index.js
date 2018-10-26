import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';

const heading = new Heading();
heading.render();
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();


if (process.env.NODE_ENV === 'production') {
	console.log('production')
} else {
	console.log('development')
}

// prod -> bundle.js:1からエラーがおきる。prodで圧縮されているから
// dev -> index.js:18からエラーがおきる。
// helloWorldButton.methodThatNotExists()