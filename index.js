const Rust = import("./pkg/index");
const canvas = document.getElementById("canvas_rust");
const GL = canvas.getContext('webgl', { antialias: true });

Rust.then(m => {
    if (!GL) {
        alert("Failed to initialise GL");
        return;
    }

    GL.enable(GL.BLEND);
    GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

    const FPS_THROTTLE = 1000.0 / 30.0; //milliseconds / frames
    const webClient = new m.WebClient();
    const initialTime = Date.now();
    let lastDrawTime = -1;

    function render() {
        window.requestAnimationFrame(render);
        const currTime = Date.now();

        if (currTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currTime;
            if (window.innerHeight != canvas.height || window.innerWidth != canvas.width) {
                canvas.height = window.innerHeight;
                canvas.clientHeight = window.innerHeight;
                canvas.style.height = window.innerHeight;

                canvas.width = window.innerWidth;
                canvas.clientWidth = window.innerWidth;
                canvas.style.width = window.innerWidth;

                GL.viewport(0, 0, window.innerWidth, window.innerHeight);
            }

            let elapsedTime = currTime - initialTime;
            webClient.update(elapsedTime, window.innerHeight, window.innerWidth);
            webClient.render();
        }
    }

    render();
});