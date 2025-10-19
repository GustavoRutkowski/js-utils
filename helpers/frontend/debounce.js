import wait from '../global/wait.js';

function debounce(callback, delay) {
    let waiting = null;

    return async (...args) => {
        if (waiting) waiting.cancel();
        waiting = wait(delay);

        try {
            await waiting;
            callback(...args);
        } catch (e) {}
    };
}

export default debounce;
