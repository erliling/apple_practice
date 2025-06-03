let minimagewidth = getminimagewidth();


window.onload = function () {
    const carsouselcontentcontainer = document.querySelector('.camera2 .carsouselcontentcontainer');
    const carouselcontent = document.querySelector('.camera2 .carouselcontent');

    carsouselcontentcontainer.style.height = `${carouselcontent.offsetHeight}px`;
    window.addEventListener('resize', () => {
        carsouselcontentcontainer.style.height = `${carouselcontent.offsetHeight}px`;
        minimagewidth = getminimagewidth();
    })

    const img = document.getElementsByClassName('devicewrapper')[0];
    const img2 = document.getElementsByClassName('devicewrapper')[1];

    const container = document.getElementsByClassName('stickycontainer')[0];
    const container2 = document.getElementsByClassName('stickycontainer')[1];

    const screen = document.getElementsByClassName('screen')[0];
    const screen2 = document.getElementsByClassName('screen')[1];
    const frame = document.getElementsByClassName('frame')[0];
    const frame2 = document.getElementsByClassName('frame')[1];
    const device2 = document.getElementsByClassName('device')[1];
    
    const sectiontitlecontent2 = document.getElementsByClassName('sectiontitlecontent2')[0];
    const sectiontitlecontent3 = document.getElementsByClassName('sectiontitlecontent2')[1];

    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        let scale = changescale(container, img, sectiontitlecontent2);
        let scale2 = changelargescale(container2, img2, sectiontitlecontent3);
    
        // if scroll down, at some point makes the text disappear; vice versa
        // changeopacity(sectiontitlecontent2, scale, currentScroll, lastScrollTop);
        // changeopacity2(sectiontitlecontent3, scale2, currentScroll, lastScrollTop);
    
        // if scroll down, at some point makes the frame appear; vice versa
        changedisplay(frame, scale, currentScroll, lastScrollTop);
        changedisplay2(frame2, scale2, currentScroll, lastScrollTop, screen2);
    
        // keep data for next call
        lastScrollTop = currentScroll;
    
        // keep the device wrapper always in the middle of screen before scroll away
        // the div's position: sticky, and its container doesn't have overflow: scroll
        // so the div's top is relative to the viewport not the whole sticky container
        changetop(screen, img);
        changetop2(screen2, img2);
    }); 
}

function changetop(screen, img) {
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}
function changetop2(screen, img) {
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height + 0.7*screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}

function changedisplay(frame, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 1.4)) {
        frame.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale > 1.4)) {
        frame.style.display = 'none';
    }
}
function changedisplay2(frame2, scale2, currentScroll, lastScrollTop, screen2) {

    if ((currentScroll > lastScrollTop) && (scale2 < 3.4)) {
        frame2.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale2 > 3.4)) {
        frame2.style.display = 'none';
    }
}

function changeopacity(sectiontitlecontent2, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 1.45)) {
        sectiontitlecontent2.style.opacity = 0;
    }
    if ((currentScroll < lastScrollTop) && (scale > 1.45)) {
        sectiontitlecontent2.style.opacity = 1;
    }
}
function changeopacity2(sectiontitlecontent2, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 3.45)) {
        // sectiontitlecontent2.style.opacity = 0;
    }
    if ((currentScroll < lastScrollTop) && (scale > 3.45)) {
        // sectiontitlecontent2.style.opacity = 1;
    }
}

function changescale(container, img, sectiontitlecontent2) {
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    // Get scroll progress between 0 and 1
    const progress = Math.min(Math.max(-containerTop / windowHeight, 0), 1);

    // Scale from 1.5 to 0.5 as you scroll through the container
    let scale = 1.5 - progress * 1;
    if (scale < 0.57) {
        scale = 0.57;
    }
    img.style.transform = `scale(${scale})`;

    sectiontitlecontent2.style.opacity = 1-progress;

    return scale;
}

function changelargescale(container, img, sectiontitlecontent2) {
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    
    minimagewidth = getminimagewidth();
    const imgwidth = img.getBoundingClientRect().width;

    // Get scroll progress between 0 and 1
    // const progress = Math.min(Math.max(-containerTop / containerHeight, 0), 1);

    // Progress from 0 to 1 during the shrink phase (first viewport height of stickycontainer)
    const progress = Math.min(Math.max(-containerTop / windowHeight, 0), 1);
    // console.log('container top: ' + containerTop);
    // console.log('container height: ' + containerHeight);
    // console.log('window height: ' + windowHeight);

    let translateX = 4 - (1-progress) * 4;

    // create a 0.5 to 3.5 scale
    let scale = 3.5 - progress * 3;
    // 0.57 is the min scale
    if (scale < 0.57) {
        scale = 0.57;
    }

    img.style.transform = `scale(${scale}) translateX(-${translateX}%)`;

    sectiontitlecontent2.style.opacity = 1-progress;

    return scale;
}

function getminimagewidth() {
    // get width-8 property in css
    const vw = window.innerWidth / 100;

    const root = document.documentElement;
    const scrollbarWidthStr = getComputedStyle(root).getPropertyValue('--global-scrollbar-width');
    const scrollbarWidth = parseFloat(scrollbarWidthStr); 

    const calcValue = 58.3332333333 * vw - (scrollbarWidth / 12 * 8);
    const minImageWidth = Math.min(calcValue, 1120);

    return minImageWidth;
}

