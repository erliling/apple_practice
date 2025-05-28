
window.onload = function () {
    const img = document.getElementsByClassName('devicewrapper')[0];
    const img2 = document.getElementsByClassName('devicewrapper')[1];
    const screenimg = document.querySelector('.camera2 .stickycontainer .device img');
    const container = document.getElementsByClassName('stickycontainer')[0];
    const container2 = document.getElementsByClassName('stickycontainer')[1];

    const screen = document.getElementsByClassName('screen')[0];
    const screen2 = document.getElementsByClassName('screen')[1];
    const frame = document.getElementsByClassName('frame')[0];
    const frame2 = document.getElementsByClassName('frame')[1];
    const sectiontitlecontent2 = document.getElementsByClassName('sectiontitlecontent2')[0];
    const sectiontitlecontent3 = document.getElementsByClassName('sectiontitlecontent2')[1];

    // const screenstyle = window.getComputedStyle(screen2);
    // const screenmatrix = new WebKitCSSMatrix(screenstyle.transform || "none");

    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scale = changescale(container, img);
        let scale2 = changelargescale(container2, img2, screen2, frame2);
    
        // if scroll down, at some point makes the text disappear; vice versa
        const currentScroll = window.scrollY;
        changeopacity(sectiontitlecontent2, scale, currentScroll, lastScrollTop);
        changeopacity(sectiontitlecontent3, scale2, currentScroll, lastScrollTop);
    
        // if scroll down, at some point makes the frame appear; vice versa
        changedisplay(frame, scale, currentScroll, lastScrollTop);
        changedisplay2(frame2, scale2, currentScroll, lastScrollTop, screen2);
    
        // keep data for next call
        lastScrollTop = currentScroll;
    
        // keep the device wrapper always in the middle of screen before scroll away
        // the div's position: sticky, and its container doesn't have overflow: scroll
        // so the div's top is relative to the viewport not the whole sticky container
        changetop(screen, img);
        changetop(screen2, img2);
    }); 
}

function changetop(screen, img) {
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
    // let topvalue = (window.innerHeight - screen.getBoundingClientRect().height + 0.6*screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}

function changedisplay(frame, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 3.4)) {
        frame.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale > 3.4)) {
        frame.style.display = 'none';
    }
}
function changedisplay2(frame2, scale2, currentScroll, lastScrollTop, screen2) {
    // let screentranslateX = screenmatrix.m41;

    if ((currentScroll > lastScrollTop) && (scale2 < 3.4)) {
        frame2.style.display = 'block';
        // frame2.style.transform = 'translateX(0) translateY(0)';
        // screen2.style.transform = 'translateX(0) translateY(0)';
    }
    if ((currentScroll < lastScrollTop) && (scale2 > 3.4)) {
        frame2.style.display = 'none';
        // frame2.style.transform = 'translateX(4%) translateY(-30%)';
        // screen2.style.transform = 'translateX(4%) translateY(-30%)';
    }
}

function changeopacity(sectiontitlecontent2, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 3.45)) {
        sectiontitlecontent2.style.opacity = 0;
    }
    if ((currentScroll < lastScrollTop) && (scale > 3.45)) {
        sectiontitlecontent2.style.opacity = 1;
    }
}

function changescale(container, img) {
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;

    // Get scroll progress between 0 and 1
    const progress = Math.min(Math.max(-containerTop / containerHeight, 0), 1);

    // Scale from 1.5 to 0.5 as you scroll through the container
    let scale = 1.5 - progress * 1;
    if (scale < 0.5) {
        scale = 0.5;
    }
    img.style.transform = `scale(${scale})`;
    return scale;
}
function changelargescale(container, img, screen2, frame2) {
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;

    // Get scroll progress between 0 and 1
    const progress = Math.min(Math.max(-containerTop / containerHeight, 0), 1);

    // Scale from 1.5 to 0.5 as you scroll through the container
    let scale = 3.5 - progress * 3;
    if (scale < 0.5) {
        scale = 0.5;
    }
    img.style.transform = `scale(${scale})`;


    // change screen2's translate

    // change frame's translate


    return scale;
}
