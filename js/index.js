
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
        
        // resizeslider(images, maskslide);
        // const imglist = document.querySelector('.photograph .stickycontainer .imglist');
        resizeframe(overlay);
    })


    // shrink img via scroll
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


    // const stickycontainer1 = document.querySelector('.videoaudio .stickycontainer1');

    // wipe scroll
    const scrollwrapper = document.querySelector('.photograph .scrollwrapper');
    const images = document.querySelectorAll('.photograph .stickycontainer .image');
    const slides = document.querySelectorAll('.photograph .stickycontainer .slide');
    const imglist = document.querySelector('.photograph .stickycontainer .imglist');
    const overlay = document.querySelector('.photograph .stickycontainer .frame');
    const overlayadjust = document.querySelector('.photograph .stickycontainer .frameadjust');

    const stickycontainer = document.querySelector('.photograph .stickycontainer');
    
    // disolve scroll
    const piccontainer = document.querySelector('.photograph .textpic .piccontainer');
    const pics = document.querySelectorAll('.photograph .textpic .pic');

    // stickycontainer1.addEventListener('scroll', () => {
    //     // shrinkscroll1(container, img, sectiontitlecontent2, frame, screen, lastScrollTop);
    // });

    window.addEventListener('scroll', () => {
        
        // moveslider(scrollwrapper, images, maskslide);

        shrinkscroll1(container, img, sectiontitlecontent2, frame, screen);
        
        shrinkscroll2(container2, img2, sectiontitlecontent3, frame2, screen2);

        wipescroll(scrollwrapper, images, overlay, imglist, overlayadjust);

        disolvescroll(piccontainer, pics);
    }); 
}

let lastScrollTop = 0;

function shrinkscroll1(container, img, sectiontitlecontent2, frame, screen) {
    console.log("enter videoaudio");
    
    // Get scroll progress between 0 and 1
    const progress = getprogress(container);

    // change img's scale and return scale value
    let scale = changescale(progress, img);

    // change img's opacity
    changeopacity(progress, sectiontitlecontent2);

    // if scroll down, at some point makes the frame appear; vice versa
    const currentScroll = window.scrollY;
    changedisplay(frame, scale, currentScroll, lastScrollTop);
    // keep data for next call
    lastScrollTop = currentScroll;

    // keep the device wrapper always in the middle of screen before scroll away
    // the div's position: sticky, and its container doesn't have overflow: scroll
    // so the div's top is relative to the viewport not the whole sticky container
    changetop(screen, img);
}

let lastScrollTop2 = 0;

function shrinkscroll2(container2, img2, sectiontitlecontent3, frame2, screen2) {
    // console.log("enter camera2");
    
    // Get scroll progress between 0 and 1
    const progress2 = getprogress(container2);

    // change img's scale and return scale value
    let scale2 = changescale2(progress2, img2);

    // change img's opacity
    changeopacity(progress2, sectiontitlecontent3);

    // if scroll down, at some point makes the frame appear; vice versa
    const currentScroll = window.scrollY;
    changedisplay2(frame2, scale2, currentScroll, lastScrollTop2, screen2);
    // keep data for next call
    lastScrollTop2 = currentScroll;

    // keep the device wrapper always in the middle of screen before scroll away
    // the div's position: sticky, and its container doesn't have overflow: scroll
    // so the div's top is relative to the viewport not the whole sticky container
    changetop2(screen2, img2);
}

function disolvescroll(piccontainer, pics) {
    // console.log("enter photography2");

    const rect = piccontainer.getBoundingClientRect();
    const recttop = -rect.top;
    const scrollheight = window.innerHeight;

    if (recttop <= 0.5*scrollheight) {
        pics[0].style.opacity = "1";
        pics[1].style.opacity = "0";
        pics[2].style.opacity = "0";
    } else if ((recttop > 0.5*scrollheight) && (recttop <= 1.5*scrollheight)) {
        pics[0].style.opacity = "0";
        pics[1].style.opacity = "1";
        pics[2].style.opacity = "0";
    } else if (recttop > 1.5*scrollheight) {
        pics[0].style.opacity = "0";
        pics[1].style.opacity = "0";
        pics[2].style.opacity = "1";
    }
}

// let reveal1 = 100;
// let reveal2 = 100;
// let progress1 = 0;
// let progress2 = 0;
// let progress3 = 0;
// let scale = 1;

// function moveslider(scrollwrapper, images, maskslide) {

//     const rect = scrollwrapper.getBoundingClientRect();
//     const recttop = -rect.top;
//     const scrollheight = window.innerHeight;
//     let top = window.innerHeight * 0.5 - 1050/2 + 52/2;
//     // console.log(recttop, scrollheight);
//     let adjust_recttop = recttop + top;
//     console.log(adjust_recttop, scrollheight);

//     if (adjust_recttop <= scrollheight) {
//         console.log("1st pic");

//         if ((progress2 < 1) && (progress2 > 0)) {
//             const adjusttop = adjust_recttop - scrollheight;
//             progress2 = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
//             revealimage(reveal2, progress2, images[2], maskslide);
//         }

//         // rectop has to start from 0, otherwise progress won't start from 0
//         progress1 = Math.min(Math.max(adjust_recttop / scrollheight, 0), 1);
//         console.log("progress1: " + progress1);
        
//         revealimage(reveal1, progress1, images[1], maskslide);

//     } else if ((adjust_recttop > scrollheight) && (adjust_recttop <= 2*scrollheight)) {
//         // 2nd pic
//         console.log("2nd pic");

//         if (progress1 < 1) {
//             progress1 = Math.min(Math.max(adjust_recttop / scrollheight, 0), 1);
//             revealimage(reveal1, progress1, images[1], maskslide);
//         }

//         // console.log("reveal1: "+ reveal1);
//         const adjusttop = adjust_recttop - scrollheight;
//         progress2 = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
//         console.log("progress2: " + progress2);
        
//         revealimage(reveal2, progress2, images[2], maskslide);
        
//         console.log("progress3: " + progress3);
//         if ((progress3 < 1) && (progress3 > 0)) {
//             const adjusttop = adjust_recttop - scrollheight*2;
//             progress3 = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
//             enlargeframe(progress3);
//         }

//     } else if (adjust_recttop > 2*scrollheight) {
//         console.log("3rd pic");

//         if (progress2 < 1) {
//             const adjusttop = adjust_recttop - scrollheight;
//             progress2 = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
//             revealimage(reveal2, progress2, images[2], maskslide);
//         }

//         // console.log("reveal2: "+ reveal2);
//         const adjusttop = adjust_recttop - scrollheight*2;
//         progress3 = Math.min(Math.max(adjusttop / scrollheight, 0), 1);
//         console.log("progress3: " + progress3);
        
//         // let slider move from 0 to -20
//         let new_progress = Math.pow(progress3, 0.2);
//         const moveoffset = -20 * new_progress;
//         maskslide.style.left = `${moveoffset}px`;

//         enlargeframe(progress3);
//     }
// }

// previous scroll top, pair with currentScroll2
let lastscrolltop2 = 0;
// pair with index
let previndex = 0;

let currentprogress = 0;
let prevprogress = 0;

// for reveal prev images or hide next images
let firstprevflag = 1;
let middleprevflag = 0;
let middlenextflag = 0;
let lastnextflag = 1;

function wipescroll(scrollwrapper, images, overlay, imglist, overlayadjust) {
    // console.log("enter photography");

    const rect = scrollwrapper.getBoundingClientRect();
    const recttop = -rect.top;
    const scrollheight = window.innerHeight;
    let top = window.innerHeight * 0.5 - 1050/2 + 52/2;
    let adjust_recttop = recttop + top;

    const imagenum = Array.from(images).length;

    // current scroll top
    const currentScroll2 = window.scrollY;

    images.forEach((image, index) => {
        if ((index == 0) && (adjust_recttop <= scrollheight)) {
            // console.log("1st pic");

            // reset middle progresses
            resetmiddleflag();

            // when scroll down
            // reset n - 2 images clippath
            //fixing resizing issues
            if (lastscrolltop2 < currentScroll2) {
                resetimgclippath(images);
            }
            
            currentprogress = Math.min(Math.max(adjust_recttop / scrollheight, 0), 1);
            revealimg(images[index + 1], currentprogress, overlay, index);

            // when scroll up
            // set value for firstprevprogress the first time
            // when the index + 2 haven't finished hiding, completely hide here
            if (lastscrolltop2 > currentScroll2) { 
                if (firstprevflag == 1) {
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index+1);
                        firstprevflag = 0;
                    }
                }

                // if ((index == 0) && (firstprevprogress == 1)) {
                //     firstprevprogress = prevprogress;
                // }
                // if ((firstprevprogress < 1) && (firstprevprogress > 0)) {
                //     // only once
                //     // this need to be reset in the next condition
                //     firstprevprogress = 0;
                //     revealimg(images[index + 2], firstprevprogress, overlay, index+1);
                // }
            }

            prevprogress = currentprogress;
            
        } else if ((index == (imagenum - 1)) && (adjust_recttop > index * scrollheight)) {
            // console.log("last pic");
            
            // reset middle progress
            resetmiddleflag();

            let adjust_adjust_rectop = adjust_recttop - index * scrollheight;
            currentprogress = Math.min(Math.max(adjust_adjust_rectop / scrollheight, 0), 1);

            // continue remove prev image
            if (lastscrolltop2 < currentScroll2) {
                if (prevprogress < 1) {
                    prevprogress = 1;
                    revealimg(images[index], prevprogress, overlay, index - 1);
                }
            }

            // after remove prev image, start to shrink
            if (prevprogress == 1) {
                shrinkimglist(currentprogress, imglist, overlayadjust);
                expandimg(currentprogress, images);
            }
        } else if ((adjust_recttop > (index) * scrollheight) && (adjust_recttop <= (index+1) * scrollheight)) {
            // console.log("middle pic: " + index);
            
            // reset flag
            resetfirstflag();

            let adjust_adjust_rectop = adjust_recttop - index * scrollheight;
            currentprogress = Math.min(Math.max(adjust_adjust_rectop / scrollheight, 0), 1);
            revealimg(images[index + 1], currentprogress, overlay, index);


            // when scroll down
            // continue reveal prev images
            if (lastscrolltop2 < currentScroll2) {
                if ((index == 1) && (middleprevflag == 0)) {
                    // second img, handle scroll forward, get value from prevprogress (across block)
                    if ((prevprogress > 0) && (prevprogress < 1)) {
                        revealimg(images[index], 1, overlay, index - 1);
                        middleprevflag = 1;
                    }
                } else if ((index > 1) && (index != previndex)) {
                    middleprevflag = 0;
                    // every time when the index changes, get value from prevprogress (inside block)
                    if ((prevprogress > 0) && (prevprogress < 1)) {
                        revealimg(images[index], 1, overlay, index - 1);
                        middleprevflag = 1;
                    }
                }
                
            }
            
            // when scroll up
            // continue hide next images
            if (lastscrolltop2 >= currentScroll2) {
                if ((index == imagenum - 2) && (middlenextflag == 0)) {
                    // second to last img, handle scroll backward, get value from prevprogress (across block)
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index+1);
                        middlenextflag = 1;
                    }
                } else if ((index >= 1) && (index < (imagenum - 2) && (index != previndex))) {
                    middlenextflag = 0;
                    // every time when the index changes, get value from prevprogress (inside block)
                    if ((prevprogress < 1) && (prevprogress > 0)) {
                        revealimg(images[index + 2], 0, overlay, index+1);
                        middlenextflag = 1;
                    }
                } 

                if ((index == imagenum - 2) && (lastnextflag == 1)) {
                    // second to last img, continue expand frame
                    if ((prevprogress <= 1) && (prevprogress > 0)) {
                        shrinkimglist(0, imglist, overlayadjust);
                        expandimg(0, images);
                    }
                }
                
            }
            
            previndex = index;
            
            prevprogress = currentprogress;
        }
    });

    lastscrolltop2 = currentScroll2;

}

function resetfirstflag() {
    firstprevflag = 1;
}

function resetmiddleflag() {
    middleprevflag = 0;
    middlenextflag = 0;
    lastnextflag = 1;
}

function resetimgclippath(images) {
    images.forEach((image, index) => {
        if (index > 1) {
            const imgWidth = image.getBoundingClientRect().width;
            image.style.clipPath = `inset(0 0 0 ${imgWidth}px)`;
        }
    });
}

function shrinkimglist(progress, imglist, overlayadjust) {
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
    const reveal = 100 - progress * 100;

    const imgWidth = imgobj.getBoundingClientRect().width;
    const moveoffset = imgWidth * reveal * 0.01;

    // for image
    // Everything to the left of moveoffset mark will be completely hidden.
    imgobj.style.clipPath = `inset(0 0 0 ${moveoffset}px)`;
    imgobj.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;

    // for overlay
    // start from translatex = 0
    const adjustmoveoffset = moveoffset - (movedimgnum + 1) * imgWidth;
    // overlay continue moves to the left with a negative offset
    overlay.style.transform = `matrix(1, 0, 0, 1, ${adjustmoveoffset}, 0)`;
}

function resizeframe(overlay) {
    if (prevprogress == 1) {
        // reset slide to slide one, so it will always align to the left
        overlay.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    }
}

// function enlargeframe(progress) {
//     // not shrink the img, but enlarge the frame around it
//     //rect left, width: 100
//     //rect right, width: 100
//     //rect bottom, height: 100
//     //corner bottom left, left: 90px, bottom: 100px
//     //corner bottom right, right: 90px, bottom: 100px
//     const rect_left = document.querySelector('.photograph .stickycontainer .frame .rect.left');
//     const rect_right = document.querySelector('.photograph .stickycontainer .frame .rect.right');
//     const rect_bottom = document.querySelector('.photograph .stickycontainer .frame .rect.bottom');
//     const corner_bot_left = document.querySelector('.photograph .stickycontainer .frame .corner.bottom.left');
//     const corner_bot_right = document.querySelector('.photograph .stickycontainer .frame .corner.bottom.right');

//     // progress 0 - 1, increase more in the beginning
//     let new_progress = Math.pow(progress, 0.2);

//     // create 10 - 100 width
//     let left_width = 10 + 90 * new_progress;
//     rect_left.style.width = `${left_width}px`;

//     let right_width = 10 + 90 * new_progress;
//     rect_right.style.width = `${right_width}px`;

//     let bottom_width = 10 + 90 * new_progress;
//     rect_bottom.style.height = `${bottom_width}px`;

//     let corner_lr = 90 * new_progress;
//     let corner_bottom = 100 * new_progress;

//     corner_bot_left.style.left = `${corner_lr}px`;
//     corner_bot_left.style.bottom = `${corner_bottom}px`;

//     corner_bot_right.style.right = `${corner_lr}px`;
//     corner_bot_right.style.bottom = `${corner_bottom}px`;
// }

// function resizeslider(images, maskslide) {
//     // const images = document.querySelectorAll('.photograph .stickycontainer .image');
//     // console.log('resizeslider: ' + reveal1);
//     if (reveal1 == 100) {
//         const imgWidth = images[0].getBoundingClientRect().width;
//         const moveoffset = imgWidth * reveal1 * 0.01;
//         maskslide.style.left = `${moveoffset}px`;

//         // console.log('resizeslider: ' + moveoffset);
//     }
// }

// function revealimage(reveal, progress, imgobj, maskslide) {

//     reveal = 100 - progress * 100;
//     console.log("reveal: "+ reveal);

//     const imgWidth = imgobj.getBoundingClientRect().width;
//     const moveoffset = imgWidth * reveal * 0.01;

//     // hide maskslide in the beginning, maskslide is outside of img
//     maskslide.style.left = `${moveoffset}px`;
//     imgobj.style.clipPath = `inset(0 0 0 ${moveoffset}px)`;
// }

function getminimagewidth() {
    // console.log('resize');

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
    // console.log('lasttop: ' + lastScrollTop);
    // console.log('currenttop: ' + currentScroll);
    if ((currentScroll > lastScrollTop) && (scale < 1.4)) {
        frame.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale > 1.4)) {
        // console.log('none');
        frame.style.display = 'none';
    }
}
function changedisplay2(frame2, scale2, currentScroll, lastScrollTop) {

    // console.log('lasttop2: ' + lastScrollTop);
    // console.log('currenttop2: ' + currentScroll);
    if ((currentScroll > lastScrollTop) && (scale2 < 3.4)) {
        frame2.style.display = 'block';
    }
    if ((currentScroll < lastScrollTop) && (scale2 > 3.4)) {
        // console.log('none2');
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







