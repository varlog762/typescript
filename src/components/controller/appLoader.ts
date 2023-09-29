import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '1a63bc83f68044919f1f0ebd2e2394d6',
        });
    }
}

export default AppLoader;
