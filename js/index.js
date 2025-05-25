
window.onload = function () {
    const img = document.getElementsByClassName('devicewrapper')[0];
    const container = document.getElementsByClassName('stickycontainer')[0];
    const screen = document.getElementsByClassName('screen')[0];
    const frame = document.getElementsByClassName('frame')[0];
    const sectiontitlecontent2 = document.getElementsByClassName('sectiontitlecontent2')[0];
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
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
    
        // if scroll down, at some point makes the text disappear; vice versa
        const currentScroll = window.scrollY;
        if ((currentScroll > lastScrollTop) && (scale < 1.45)) {
            sectiontitlecontent2.style.opacity = 0;
        }
        if ((currentScroll < lastScrollTop) && (scale > 1.45)) {
            sectiontitlecontent2.style.opacity = 1;
        }
    
        // if scroll down, at some point makes the frame appear; vice versa
        if ((currentScroll > lastScrollTop) && (scale < 1.4)) {
            frame.style.display = 'block';
        }
        if ((currentScroll < lastScrollTop) && (scale > 1.4)) {
            frame.style.display = 'none';
        }
    
        // keep data for next call
        lastScrollTop = currentScroll;
    
        // keep the device wrapper always in the middle of screen before scroll away
        // the div's position: sticky, and its container doesn't have overflow: scroll
        // so the div's top is relative to the viewport not the whole sticky container
        let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
        img.style.top = `${topvalue}px`;
    }); 
}
