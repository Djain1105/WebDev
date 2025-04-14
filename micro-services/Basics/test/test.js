const autocannon = require('autocannon');

const runTest = (url) => {
    console.log(`Starting test for: ${url}`);
    const instance = autocannon({
        url,
        duration: 30, // Test duration in seconds
    });

    autocannon.track(instance);

    instance.on('done', (result) => {
        console.log(`Test completed for: ${url}`);
        console.log(`Total Requests: ${result.requests.total}`);
        console.log(`Total Time (seconds): ${result.duration}`);
        console.log(`Total Errors: ${result.errors}`);
    });
};

// Run tests concurrently
const urls = ['http://localhost:3000', 'http://localhost:3000/stress-test'];

const runTestsConcurrently = async () => {
    await Promise.all(
        urls.map((url) =>
            new Promise((resolve) => {
                const instance = autocannon({
                    url,
                    duration: 30,
                });

                autocannon.track(instance);

                instance.on('done', () => {
                    resolve();
                });
            })
        )
    );
};

runTestsConcurrently();