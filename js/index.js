
window.onload = function () {
    // when menuoverlay no page scroll
    // document.body.style.overflow = "hidden";
    const toggleoverlaybtn = document.querySelector('.navshrink .toggleoverlaybtn');
    const navshrinkoverlay = document.querySelector('.navshrink .navshrinkoverlay');
    const mininav = document.querySelector('.navshrink .mininav');
    
    toggleoverlaybtn.addEventListener('click', () => {
        if (hasClass(navshrinkoverlay, 'opened')) {
            navshrinkoverlay.style.display = 'none';
            mininav.style.opacity = 1;
            removeClass(navshrinkoverlay, 'opened');
            document.body.style.overflow = "auto";
        } else {
            navshrinkoverlay.style.display = 'block';
            mininav.style.opacity = 0;
            addClass(navshrinkoverlay, 'opened');
            document.body.style.overflow = "hidden";
        }
        
    });

    // flymenu
    const secondmenus = document.querySelectorAll('.secondmenu');
    const secondmenuoverlay = document.querySelector('.navcls .navoverlay');

    secondmenus.forEach((secondmenu, index) => {
        const flycolumns = secondmenu.querySelectorAll('.flyout-column');

        // Set the total number of elevated groups for the calculation
        secondmenu.style.setProperty('--r-globalnav-flyout-elevated-group-count', 1); // Example: 1 elevated group

        // Loop through each column and set its unique number
        setsecondmenucolumnnum(flycolumns);

        const flymenu = secondmenu.querySelector('.flyout-menu');
        const navitem = secondmenu.parentElement;
        hoversecondmenuitem(navitem, flycolumns, flymenu, secondmenu, secondmenuoverlay);
    })

    // play video and switch to img
    const welcomevideo = document.querySelector('.welcome .content .video-wrapper video');
    const welcomeimg = document.querySelector('.welcome .content .video-wrapper .picture2');
    const welcometitle = document.querySelector('.welcome .content .picture1');

    const applyscale = ()=> {
        welcometitle.classList.add('scaledown');
    }
    // 1. Check if the video is already playing
    if (!welcomevideo.paused && !welcomevideo.ended) {
        // If it is, apply the class immediately
        applyscale();
    }
    // 2. If it's not playing yet, listen for the 'playing' event
    // The { once: true } ensures the listener runs only once, for good practice
    welcomevideo.addEventListener('playing', applyscale, { once: true });

    // welcomevideo.addEventListener('playing', () => {
    //     // welcometitle.style.opacity = 1;
    //     // welcometitle.style.transform = 'scale(1)';
       
    // });

    welcomevideo.addEventListener('ended', () => {
        welcomevideo.pause();
        welcomevideo.style.opacity = 0;
        welcomeimg.style.opacity = 1;

        // welcometitle.style.opacity = 1;
        // welcometitle.style.transform = 'scale(1)';

        // Optional: After the transition, hide the video element completely to save resources
        setTimeout(() => {
            welcomevideo.style.display = 'none';
        }, 1000); // Wait for 1 second to match the CSS transition duration
    })

    // resizing
    // update the height and min width values when resized
    window.addEventListener('resize', () => {
        // carsouselcontentcontainer.style.height = `${carouselcontent.offsetHeight}px`;
        // minimagewidth = getminimagewidth();
        
        resizeframe(overlay);
    })

    // show nav scroll
    const welcome = document.querySelector('.welcome');
    const fixednav = document.querySelector('.fixednav');

    // shrink scroll
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

    const videoaudio = document.querySelector('.videoaudio');
    const navheight = 0;
    const camera2 = document.querySelector('.camera2');


    // wipe scroll
    const scrollwrapper = document.querySelector('.photograph .scrollwrapper');
    const images = document.querySelectorAll('.photograph .stickycontainer .image');
    const imglist = document.querySelector('.photograph .stickycontainer .imglist');
    const overlay = document.querySelector('.photograph .stickycontainer .frame');
    const overlayadjust = document.querySelector('.photograph .stickycontainer .frameadjust');

    const photograph = document.querySelector('.photograph');


    // disolve scroll
    const piccontainer = document.querySelector('.dissolvescroll .piccontainer');
    const pics = document.querySelectorAll('.dissolvescroll .pic');
    const texts = document.querySelectorAll('.dissolvescroll .text');


    window.addEventListener('scroll', () => {
        // show nav scroll
        scrollwelcomesection(welcome, navheight, fixednav);
        
        // shrink scroll
        scrollinsection(container, img, sectiontitlecontent2, frame, screen, videoaudio, navheight, shrinkscroll1);
        scrollinsection(container2, img2, sectiontitlecontent3, frame2, screen2, camera2, navheight, shrinkscroll2);

        // wipe scroll
        scrollsection3(scrollwrapper, images, overlay, imglist, overlayadjust, photograph, navheight);

        // dissolve scroll
        scrollsection4(piccontainer, pics, texts, photograph, navheight)
    }); 
}

// function getminimagewidth() {
//     const vw = window.innerWidth / 100;

//     const root = document.documentElement;
//     const scrollbarWidthStr = getComputedStyle(root).getPropertyValue('--global-scrollbar-width');
//     const scrollbarWidth = parseFloat(scrollbarWidthStr); 

//     const calcValue = 58.3332333333 * vw - (scrollbarWidth / 12 * 8);
//     const minImageWidth = Math.min(calcValue, 1120);

//     return minImageWidth;
// }

function setsecondmenucolumnnum(flycolumns) {
    flycolumns.forEach((column, index) => {
        column.style.setProperty('--r-globalnav-flyout-group-number', index + 1);

        const items = column.querySelectorAll('.flyout-item');
        items.forEach((item, index) => {
            // Set a unique CSS variable for each item based on its position (0, 1, 2, ...)
            item.style.setProperty('--flyout-item-number', index);
        });
    });
}

function hoversecondmenuitem(navitem, flycolumns, flymenu, secondmenu, secondmenuoverlay) {
    
    navitem.addEventListener('mouseenter', () => {
        // let flymenuheight = 0;
        
        // flymenu.classList.add('is-open');
        flycolumns.forEach((column, index) => {
            column.classList.add('is-open');
            const items = column.querySelectorAll('.flyout-item');
            items.forEach((item, index) => {
                // Set a unique CSS variable for each item based on its position (0, 1, 2, ...)
                item.classList.add('is-open');
                // flymenuheight += item.getBoundingClientRect().height;
        });
        });

        // flymenuheight += 
        const flymenuheight = flymenu.clientHeight;
        // console.log(flymenuheight);
        secondmenu.style.setProperty('max-height', `${flymenuheight + 56}px`);
        // secondmenu.style.setProperty('max-height', '500px');
        // secondmenuoverlay.style.setProperty('display', 'block');
        secondmenuoverlay.style.setProperty('opacity', 1);
    })

    navitem.addEventListener('mouseleave', () => {
        // flymenu.classList.remove('is-open');
        flycolumns.forEach((column, index) => {
            column.classList.remove('is-open');
            const items = column.querySelectorAll('.flyout-item');
            items.forEach((item, index) => {
                // Set a unique CSS variable for each item based on its position (0, 1, 2, ...)
                item.classList.remove('is-open');
        });
        });
        secondmenu.style.setProperty('max-height', '0');
        // secondmenuoverlay.style.setProperty('display', 'none');
        secondmenuoverlay.style.setProperty('opacity', 0);
    })
}

function resizeframe(overlay) {
    if (prevprogress == 1) {
        // reset slide to slide one, so it will always align to the left when resizing
        overlay.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    }
}

// reset the rest of clip path under the reveal one
// function resetimgclippath(images) {
//     images.forEach((image, index) => {
//         if (index > 1) {
//             const imgWidth = image.getBoundingClientRect().width;
//             image.style.clipPath = `inset(0 0 0 ${imgWidth}px)`;
//         }
//     });
// }

function isinsection(section, navheight) {
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop - navheight; // Adjust for fixed header
    const sectionBottom = section.offsetTop + section.offsetHeight - navheight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
        return true;
    }
}

let isnavshow = false;
function scrollwelcomesection (welcome, navheight, fixednav) {
    if (isinsection(welcome, navheight)) {
        // console.log('here');
        const distancetobottom = welcome.offsetTop + welcome.offsetHeight - navheight - window.scrollY;
        if ((distancetobottom < 100) && (!isnavshow)) {
            // fixednav.style.display = 'block';
            fixednav.style.height = '52px';
            fixednav.style.borderBottomWidth = '1px';
            isnavshow = true;
        } 
        if ((distancetobottom >= 100) && (isnavshow)) {
            fixednav.style.height = '0';
            fixednav.style.borderBottomWidth = '0px';
            isnavshow = false;
        }
    }
}

function scrollinsection(container, img, sectiontitlecontent2, frame, screen, section, navheight, callbackfunction) {
    // make sure scroll into the region
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop - navheight; // Adjust for fixed header
    const sectionBottom = section.offsetTop + section.offsetHeight - navheight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
        callbackfunction(container, img, sectiontitlecontent2, frame, screen);
    }
}

let lastScrollTop = 0;

function shrinkscroll1(container, img, sectiontitlecontent2, frame, screen) {
    console.log("enter videoaudio");
    
    // Get scroll progress between 0 and 1
    const progress = getprogress(container);

    // change img's scale and return scale value
    let scale = changescale(progress, img);

    // change text's opacity
    changeopacity(progress, sectiontitlecontent2);

    // if scroll down, at some point makes the frame appear; vice versa
    const currentScroll = window.scrollY;
    changedisplay(frame, scale, currentScroll, lastScrollTop, 1.4);
    // keep data for next call; for checking scroll up or down
    lastScrollTop = currentScroll;

    // keep the device wrapper always in the middle of screen before scroll away
    // the div's position: sticky, and its container doesn't have overflow: scroll
    // so the div's top is relative to the viewport, not the whole sticky container
    changetop(screen, img);
}

// let lastScrollTop2 = 0;

function shrinkscroll2(container2, img2, sectiontitlecontent3, frame2, screen2) {
    console.log("enter camera2");
    
    // Get scroll progress between 0 and 1
    const progress2 = getprogress(container2);

    // change img's scale and return scale value
    let scale2 = changescale2(progress2, img2);

    // change img's opacity
    changeopacity(progress2, sectiontitlecontent3);

    // if scroll down, at some point makes the frame appear; vice versa
    const currentScroll = window.scrollY;
    changedisplay(frame2, scale2, currentScroll, lastScrollTop, 3.4);
    // keep data for next call
    lastScrollTop = currentScroll;

    // keep the device wrapper always in the middle of screen before scroll away
    // the div's position: sticky, and its container doesn't have overflow: scroll
    // so the div's top is relative to the viewport not the whole sticky container
    changetop2(screen2, img2);
}

function scrollsection3(scrollwrapper, images, overlay, imglist, overlayadjust, section, navheight) {
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop - navheight; // Adjust for fixed header
    const sectionBottom = section.offsetTop + section.offsetHeight - navheight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
        wipescroll(scrollwrapper, images, overlay, imglist, overlayadjust);
    }
}

function scrollsection4(piccontainer, pics, texts, section, navheight) {
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop - navheight; // Adjust for fixed header
    const sectionBottom = section.offsetTop + section.offsetHeight - navheight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
        disolvescroll(piccontainer, pics, texts);
    }
}

// function scrollinsection2(scrollwrapper, images, overlay, imglist, overlayadjust, piccontainer, pics, texts, section, navheight, callbackfunction, callbackfunction2) {
//     const scrollY = window.scrollY;
//     const sectionTop = section.offsetTop - navheight; // Adjust for fixed header
//     const sectionBottom = section.offsetTop + section.offsetHeight - navheight;

//     if (scrollY >= sectionTop && scrollY < sectionBottom) {
//         callbackfunction(scrollwrapper, images, overlay, imglist, overlayadjust);
//         callbackfunction2(piccontainer, pics, texts);
//     }
// }


// previous scroll top, pair with currentScroll2

let lastscrolltop2 = 0;

// pair with index
let previndex = 0;

let currentprogress = 0;
let prevprogress = 0;

// for reveal prev images or hide next images
// for first region
let firstprevflag = 1;
// for middle region
let middleprevflag = 0;
let middlenextflag = 0;
// for last region
let lastnextflag = 1;

function wipescroll(scrollwrapper, images, overlay, imglist, overlayadjust) {
    console.log("enter photography");

    const rect = scrollwrapper.getBoundingClientRect();
    const recttop = -rect.top;
    // 1vh
    const scrollheight = window.innerHeight;

    //  --r-localnav-height: 52px;
    //  --gallery-height: 1050px;
    // const rootStyles = window.getComputedStyle(document.documentElement);
    // const galleryheight = rootStyles.getPropertyValue('--gallery-height');
    // const navheight = rootStyles.getPropertyValue('--r-localnav-height');
    // let top = (window.innerHeight  - parseFloat(galleryheight) + parseFloat(navheight)) * 0.5;
    // let top = (window.innerHeight  - 1050 + 52) * 0.5;
    // let adjust_recttop = recttop + top;
    let adjust_recttop = recttop;

    // current scroll top, for deciding up or down
    const currentScroll2 = window.scrollY;

    // number of images
    const imagenum = Array.from(images).length;

    // normal reveal, index + 1
    // scroll up, index + 2
    // scroll down, index
    images.forEach((image, index) => {
        if ((index == 0) && (adjust_recttop <= scrollheight)) {
            // first region
            // console.log("1st pic");

            // reset middle progresses
            resetmiddleregionflag();
            resetlastregionflag();
            
            // step 1, normal reveal
            currentprogress = Math.min(Math.max(adjust_recttop / scrollheight, 0), 1);
            revealimg(images[index + 1], currentprogress, overlay, index);

            // step 2, hide the rest of index+2 image (third image)
            // when scroll up
            // progress smaller is hide, larger is show
            if (lastscrolltop2 > currentScroll2) { 
                // firstprevflag = 1 by default
                // only do this once when the first time enter into the first region from middle region 
                // cz later prevprogress will be in block prevprogress not across block
                if (firstprevflag == 1) {
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index+1);
                        firstprevflag = 0;
                    }
                }
            }

            prevprogress = currentprogress;
            
        } else if ((index == (imagenum - 1)) && (adjust_recttop > index * scrollheight)) {
            // last region
            // console.log("last pic");
            
            // reset middle progress
            resetmiddleregionflag();
            resetlastregionflag();

            // step 1, last image no reveal
            let adjust_adjust_rectop = adjust_recttop - index * scrollheight;
            currentprogress = Math.min(Math.max(adjust_adjust_rectop / scrollheight, 0), 1);

            // step 2, show the rest of index image (last image)
            // when scroll down
            // progress smaller is hide, larger is show
            if (lastscrolltop2 < currentScroll2) {
                if (prevprogress < 1) {
                    revealimg(images[index], 1, overlay, index - 1);
                    prevprogress = 1;
                }
            }

            // step 3, shrink frame and expand image
            // after remove prev image, start to shrink
            if (prevprogress == 1) {
                shrinkimglist(currentprogress, imglist, overlayadjust, overlay);
                expandimg(currentprogress, images);
            }
        } else if ((adjust_recttop > (index) * scrollheight) && (adjust_recttop <= (index+1) * scrollheight)) {
            // middle region
            // console.log("middle pic: " + index);
            
            // reset flag
            resetfirstregionflag();
            // resetlastregionflag();

            // step 1, normal reveal
            let adjust_adjust_rectop = adjust_recttop - index * scrollheight;
            currentprogress = Math.min(Math.max(adjust_adjust_rectop / scrollheight, 0), 1);
            revealimg(images[index + 1], currentprogress, overlay, index);

            // step 2, show the rest of index image (prev imcompleted image)
            // when scroll down
            // continue reveal prev images
            // progress smaller is hide, larger is show
            if (lastscrolltop2 < currentScroll2) {
                if ((index == 1) && (middleprevflag == 0)) {
                    // second img, handle scroll forward, get value from prevprogress (across block)
                    if ((prevprogress > 0) && (prevprogress < 1)) {
                        revealimg(images[index], 1, overlay, index - 1);
                        // only use once when across block, otherwise the value comes from inside block
                        middleprevflag = 1;
                    }
                } else if ((index > 1) && (index != previndex)) {
                    // middleprevflag = 0;
                    // every time when the index changes, get value from prevprogress (inside block)
                    if ((prevprogress > 0) && (prevprogress < 1)) {
                        revealimg(images[index], 1, overlay, index - 1);
                        // middleprevflag = 1;
                    }
                }
                
            }
            
            // step 3, hide the rest of index+1 or +2 image (next imcompleted image)
            // when scroll up
            // continue hide next images
            // progress smaller is hide, larger is show
            if (lastscrolltop2 >= currentScroll2) {
                if ((index == imagenum - 2) && (middlenextflag == 0)) {
                    // second to last img, get value from prevprogress (across block)
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index);
                        // only use once when across block
                        middlenextflag = 1;
                    }
                } else if ((index >= 1) && (index < (imagenum - 2) && (index != previndex))) {
                    // middlenextflag = 0;
                    // every time when the index changes, get value from prevprogress (inside block)
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index+1);
                        // middlenextflag = 1;
                    }
                } 

                // continue shrink and expand the rest of frame and img
                if ((index == imagenum - 2) && (lastnextflag == 1)) {
                    // second to last img, continue expand frame
                    if ((prevprogress <= 1) && (prevprogress > 0)) {
                        shrinkimglist(0, imglist, overlayadjust, overlay);
                        expandimg(0, images);
                        lastnextflag = 0;
                    }
                }
                
            }
            
            previndex = index;
            
            prevprogress = currentprogress;
        }
    });

    lastscrolltop2 = currentScroll2;
}

function disolvescroll(piccontainer, pics, texts) {
    console.log("enter photography2");

    const rect = piccontainer.getBoundingClientRect();
    const recttop = -rect.top;
    const scrollheight = window.innerHeight;

    if (recttop <= 0.5*scrollheight) {
        pics[0].style.opacity = "1";
        pics[1].style.opacity = "0";
        pics[2].style.opacity = "0";

        texts[1].style.opacity = "0.5";
        texts[2].style.opacity = "0.5";

    } else if ((recttop > 0.5*scrollheight) && (recttop <= 1.5*scrollheight)) {
        pics[0].style.opacity = "0";
        pics[1].style.opacity = "1";
        pics[2].style.opacity = "0";

        texts[1].style.opacity = "1";
        texts[2].style.opacity = "0.5";

    } else if (recttop > 1.5*scrollheight) {
        pics[0].style.opacity = "0";
        pics[1].style.opacity = "0";
        pics[2].style.opacity = "1";

        texts[1].style.opacity = "1";
        texts[2].style.opacity = "1";
    }
}

// function getTranslateX(element) {
//     // 1. Get the computed style object for the element
//     const style = window.getComputedStyle(element);
    
//     // 2. Get the full transform string
//     const transformValue = style.getPropertyValue('transform');
  
//     // 3. If there's no transform, return 0
//     if (transformValue === 'none' || !transformValue) {
//       return 0;
//     }
  
//     // 4. Use a regular expression to extract the numbers from the matrix() string
//     // This regex works for both matrix() and matrix3d()
//     const matrix = transformValue.match(/matrix(3d)?\(([^)]+)\)/);
  
//     // If no matrix is found, return 0
//     if (!matrix) {
//       return 0;
//     }

//     // 5. Parse the comma-separated string of values into an array of numbers
//     const values = matrix[2].split(', ').map(Number);

//     // 6. Return the correct value based on the matrix type
//     // In a 2D matrix(a, b, c, d, tx, ty), translateX (tx) is the 5th value (index 4)
//     // In a 3D matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, tx, ty, tz, w), translateX (tx) is the 13th value (index 12)
//     if (matrix[1] === '3d') {
//         return values[12] || 0;
//     } else {
//         return values[4] || 0;
//     }
// }

function resetfirstregionflag() {
    firstprevflag = 1;
}

function resetmiddleregionflag() {
    middleprevflag = 0;
    middlenextflag = 0;
}

function resetlastregionflag() {
    lastnextflag = 1;
}

function shrinkimglist(progress, imglist, overlayadjust, overlay) {
    // transform: matrix(0.875083, 0, 0, 0.875083, 0, 0);

    // use pow to shrink slower in the beginning
    const adjust_progress = 1 - Math.pow(progress, 2);

    if (adjust_progress >= 0.85) {
        imglist.style.transform = `matrix(${adjust_progress}, 0, 0, ${adjust_progress}, 0, 0)`;
        overlayadjust.style.transform = `matrix(${adjust_progress}, 0, 0, ${adjust_progress}, 0, 0)`;
    }
}

function expandimg(progress, images) {
    // transform: matrix(1.14275, 0, 0, 1.14275, 0, 0);

    // to expand slow in the begginning
    const adjust_progress = 1 + Math.pow(progress, 2);

    if (adjust_progress <= 1.14275) {
        images.forEach((image, index) => {
            image.style.transform = `matrix(${adjust_progress}, 0, 0, ${adjust_progress}, 0, 0)`;
            image.style.clipPath = `inset(0 0 0 0)`;
        });
    }
}

function revealimg(imgobj, progress, overlay, movedimgnum) {
    // progress smaller is hide, larger is show
    // reveal smaller is show, larger is hide
    const reveal = 100 - progress * 100;

    if (imgobj != undefined) {
        const imgWidth = imgobj.getBoundingClientRect().width;
        const moveoffset = imgWidth * reveal * 0.01;

        // for image
        // Everything to the left of moveoffset mark will be completely hidden.
        // moveoffset smaller is show, larger is hide
        if (moveoffset == imgWidth) {
            imgobj.style.clipPath = `inset(0 0 0 100%)`;
        } else {
            imgobj.style.clipPath = `inset(0 0 0 ${moveoffset}px)`;
        }
        imgobj.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;

        // for overlay, moves as image reveals
        // start from translatex = 0, continue move to left as reveal images
        // const adjustmoveoffset = moveoffset - (movedimgnum + 1) * imgWidth;
        const adjustmoveoffset = - movedimgnum * imgWidth + (moveoffset - imgWidth);
        // overlay continue moves to the left with a negative offset
        overlay.style.transform = `matrix(1, 0, 0, 1, ${adjustmoveoffset}, 0)`;
    }
    
}

function getprogress(container) {
    // is negative when entering the region
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Progress from 0 to 1 during the shrink phase (first viewport height of stickycontainer)
    const progress = Math.min(Math.max(-containerTop / windowHeight, 0), 1);
    // console.log(containerTop);
    return progress;
}

function changescale(progress, img) {

    // Scale from 1.5 to 0.5 as you scroll through the container
    let scale = 1.5 - progress * 1;
    if (scale < 0.57) {
        // stop shrinking
        scale = 0.57;
    }
    img.style.transform = `scale(${scale})`;

    return scale;
}

function changescale2(progress, img) {

    // move image and scale at the same time, range 0~4
    let translateX = 4 - (1-progress) * 4;

    // create a 0.5 to 3.5 scale
    let scale = 3.5 - progress * 3;

    if (scale < 0.57) {
        // stop shrinking
        scale = 0.57;
    }
    // img.style.transform = `scale(${scale}) translateX(-${translateX}%)`;
    img.style.transform = `scale(${scale})`;
    
    return scale;
}

function changeopacity(progress, sectiontitlecontent2) {
    // progress grows, opacity opposite
    sectiontitlecontent2.style.opacity = 1-progress;
}

function changedisplay(frame, scale, currentScroll, lastScrollTop, scalelimit) {
    // scroll down
    if ((currentScroll > lastScrollTop) && (scale < scalelimit)) {
        frame.style.display = 'block';
    }
    // scroll up
    if ((currentScroll < lastScrollTop) && (scale > scalelimit)) {
        frame.style.display = 'none';
    }
}

// function changedisplay2(frame2, scale2, currentScroll, lastScrollTop) {

//     if ((currentScroll > lastScrollTop) && (scale2 < 3.4)) {
//         frame2.style.display = 'block';
//     }
//     if ((currentScroll < lastScrollTop) && (scale2 > 3.4)) {
//         frame2.style.display = 'none';
//     }
// }

function changetop(screen, img) {
    // top get larger when the spacing between top of viewpoint and image gets larger
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}
function changetop2(screen, img) {
    // let topvalue = (window.innerHeight - screen.getBoundingClientRect().height)/2;
    // the original image is taller, so make it more lower, can't be in the image middle
    let topvalue = (window.innerHeight - screen.getBoundingClientRect().height + 0.7*screen.getBoundingClientRect().height)/2;
    img.style.top = `${topvalue}px`;
}







