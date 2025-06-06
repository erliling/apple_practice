
window.onload = function () {
    const carsouselcontentcontainer = document.querySelector('.camera2 .carsouselcontentcontainer');
    const carouselcontent = document.querySelector('.camera2 .carouselcontent');

    // get the min width of shrinking image
    let minimagewidth = getminimagewidth();

    // set the height of carousel img's outside container, which used to be 0
    carsouselcontentcontainer.style.height = `${carouselcontent.offsetHeight}px`;

    // update the height and min width values when resized
    window.addEventListener('resize', () => {
        carsouselcontentcontainer.style.height = `${carouselcontent.offsetHeight}px`;
        minimagewidth = getminimagewidth();
    })

    const container = document.getElementsByClassName('stickycontainer')[0];
    const container2 = document.getElementsByClassName('stickycontainer')[1];

    const img = document.getElementsByClassName('devicewrapper')[0];
    const img2 = document.getElementsByClassName('devicewrapper')[1];

    const screen = document.getElementsByClassName('screen')[0];
    const screen2 = document.getElementsByClassName('screen')[1];
    const frame = document.getElementsByClassName('frame')[0];
    const frame2 = document.getElementsByClassName('frame')[1];
    
    const sectiontitlecontent2 = document.getElementsByClassName('sectiontitlecontent2')[0];
    const sectiontitlecontent3 = document.getElementsByClassName('sectiontitlecontent2')[1];

    let lastScrollTop = 0;

    const scrollwrapper = document.querySelector('.photograph .scrollwrapper');
    const images = document.querySelectorAll('.photograph .stickycontainer .image');
    // const totalimages = images.length;
    // const image3 = document.querySelector('.photograph .stickycontainer .image3');
    // const slides = document.querySelector('.photograph .stickycontainer .slides');

    const maskslide = document.querySelector('.photograph .stickycontainer .maskslide');
    const imagecontent = document.querySelector('.photograph .stickycontainer .imagecontent');
    
    // shrink img via scroll
    window.addEventListener('scroll', () => {
        
        moveslider(scrollwrapper, images, maskslide, imagecontent);

        // Get scroll progress between 0 and 1
        const progress = getprogress(container);
        const progress2 = getprogress(container2);

        // change img's scale and return scale value
        let scale = changescale(progress, img);
        let scale2 = changescale2(progress2, img2);

        // change img's opacity
        changeopacity(progress, sectiontitlecontent2);
        changeopacity(progress2, sectiontitlecontent3);
    
        // if scroll down, at some point makes the frame appear; vice versa
        const currentScroll = window.scrollY;
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

let reveal1 = 100;
let reveal2 = 100;
function moveslider(scrollwrapper, images, maskslide, imagecontent) {

    const rect = scrollwrapper.getBoundingClientRect();
    const recttop = -rect.top;
    const rectheight = rect.height;
    const scrollheight = window.innerHeight;
    const imagescale = 1.2;
    
    if (recttop <= scrollheight) {
        const progress = Math.min(Math.max(recttop / scrollheight, 0), 1);
        // console.log("recttop1: " + recttop);
        // console.log("progress1: " + progress);
        // console.log("scrollheight: " + scrollheight);
        reveal1 = 100 - progress * 100;
        const imgWidth = images[1].getBoundingClientRect().width;
        const moveoffset = imgWidth * reveal1 * 0.01;
        // const adjustmoveoffset = moveoffset * imagescale;
        maskslide.style.left = `${moveoffset}px`;
        images[1].style.clipPath = `inset(0 0 0 ${moveoffset}px)`;

    } else if ((recttop > scrollheight) && (recttop <= 2*scrollheight) && (reveal1 > 0)) {
        const progress = Math.min(Math.max(recttop / scrollheight, 0), 1);
        reveal1 = 100 - progress * 100;
        const imgWidth = images[1].getBoundingClientRect().width;
        const moveoffset = imgWidth * reveal1 * 0.01;
        maskslide.style.left = `${moveoffset}px`;
        images[1].style.clipPath = `inset(0 0 0 ${moveoffset}px)`;
    
    } else if ((recttop > scrollheight) && (recttop <= 2*scrollheight) && (reveal1 <= 0)) {
        // console.log("reveal1: "+ reveal1);
        const adjusttop = recttop - scrollheight;
        const progress = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
        reveal2 = 100 - progress * 100;
        const imgWidth = images[2].getBoundingClientRect().width;
        const moveoffset = imgWidth * reveal2 * 0.01;
        maskslide.style.left = `${moveoffset}px`;
        images[2].style.clipPath = `inset(0 0 0 ${moveoffset}px)`;

    } else if ((recttop > 2*scrollheight) && (recttop <= 3*scrollheight) && (reveal2 > 0)) {
        const adjusttop = recttop - scrollheight;
        const progress = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
        reveal2 = 100 - progress * 100;
        const imgWidth = images[2].getBoundingClientRect().width;
        const moveoffset = imgWidth * reveal2 * 0.01;
        maskslide.style.left = `${moveoffset}px`;
        images[2].style.clipPath = `inset(0 0 0 ${moveoffset}px)`;

        // const wholeprogress = Math.min(Math.max(recttop / rectheight, 0), 1);
        
        // console.log('progress: ' + progress);
        // const adjustprogress = 1 - 0.2 * progress;
        // console.log('adjustprogress: ' + adjustprogress);
        // imagecontent.style.transform = `scale(${adjustprogress})`;
    } else if ((recttop > 2*scrollheight) && (reveal2 <= 0)) {
        // console.log('here');
        // imagecontent.style.transform = `scale(0.7)`;
        const adjusttop = recttop - scrollheight*2;
        const progress = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
        
        // const wholeprogress = Math.min(Math.max(recttop / rectheight, 0), 1);

        // let slider move from 0 to -20
        const moveoffset = -20 * progress;
        maskslide.style.left = `${moveoffset}px`;
        
        console.log('progress2: ' + progress);
        // min scale is 0.8, max scale is 1
        let adjustprogress = 1 - 0.2 * progress;
        console.log('adjustprogress2: ' + adjustprogress);
        if (adjustprogress > 0.98) {
            adjustprogress = 1;
        }
        imagecontent.style.transform = `scale(${adjustprogress})`;
    }
    
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

function getprogress(container) {
    const containerTop = container.getBoundingClientRect().top;
    // const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // minimagewidth = getminimagewidth();
    // const imgwidth = img.getBoundingClientRect().width;

    // Get scroll progress between 0 and 1
    // const progress = Math.min(Math.max(-containerTop / containerHeight, 0), 1);

    // Progress from 0 to 1 during the shrink phase (first viewport height of stickycontainer)
    const progress = Math.min(Math.max(-containerTop / windowHeight, 0), 1);
    return progress;
}

function changescale(progress, img) {

    // Scale from 1.5 to 0.5 as you scroll through the container
    let scale = 1.5 - progress * 1;
    if (scale < 0.57) {
        scale = 0.57;
    }
    img.style.transform = `scale(${scale})`;

    return scale;
}

function changescale2(progress, img) {

    // const progress = getprogress(container);
    let translateX = 4 - (1-progress) * 4;

    // create a 0.5 to 3.5 scale
    let scale = 3.5 - progress * 3;
    // 0.57 is the min scale
    if (scale < 0.57) {
        scale = 0.57;
    }
    img.style.transform = `scale(${scale}) translateX(-${translateX}%)`;
    
    return scale;
}

function changeopacity(progress, sectiontitlecontent2) {
    sectiontitlecontent2.style.opacity = 1-progress;
}

function changedisplay(frame, scale, currentScroll, lastScrollTop) {
    if ((currentScroll > lastScrollTop) && (scale < 1.4)) {
        frame.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale > 1.4)) {
        frame.style.display = 'none';
    }
}
function changedisplay2(frame2, scale2, currentScroll, lastScrollTop) {

    if ((currentScroll > lastScrollTop) && (scale2 < 3.4)) {
        frame2.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale2 > 3.4)) {
        frame2.style.display = 'none';
    }
}

function changetop(screen, img) {
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}
function changetop2(screen, img) {
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height + 0.7*screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}







