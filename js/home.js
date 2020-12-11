function animateSprite() {
    // Remove the event listener until animation ends
    document.getElementById("sign").removeEventListener("click", animateSprite);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const width = vw * 0.782;
    const height = width * 0.32;

    const interval = 100;  // 100ms interval = 10 fps
    const numFrames = 36;
    var frame = 2;  // Frame starts from 2 because the first one is loaded by CSS
    var position = height;

    var ID = setInterval( () => {
        document.getElementById("sign").style.backgroundPositionY = `-${position}px`;

        if (frame < numFrames) {
            // Move to the next frame
            frame += 1;
            position += height;
        }
        else {
            // Animation ended
            document.getElementById("sign").addEventListener("click", animateSprite);
            clearInterval(ID);
        }
    }, interval);
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


/***** MAIN *****/
sleep(3500).then(() => {

    // Keep copyright year up to date
    document.getElementById("year").innerHTML = new Date().getFullYear();

    // Animate sign
    document.getElementById("sign").addEventListener("click", animateSprite);
    animateSprite();  // Animate once when opening the page

    // Reanimate every time window is resized
    window.addEventListener("resize", resized);

    var resizeWatcher;
    function resized() {
        clearTimeout(resizeWatcher);
        resizeWatcher = setTimeout(animateSprite, 1500)
    }

});

