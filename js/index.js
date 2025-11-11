
window.onload = function () {
    
    // big carousel playbar
    const carouselplaybarplaybtn = document.querySelector('.carousel .bouncecircle_right');
    const carouselplaybtns = carouselplaybarplaybtn.querySelectorAll('.svg-icon');
    const carouselcontent = document.querySelector('.carousel .bigcarousel');
    const carouselplaybaraccesscontainers = document.querySelectorAll('.carousel .playbaraccesscontainer');
    const carouselplaybardots = document.querySelectorAll('.carousel .playbaraccesscontainer .bouncecircle .dot');
    const carouseltiles = carouselcontent.querySelectorAll('.carouselcontent .tile');
    

    calculatetilewidth();
    
    // click playbar main btn
    carouselplaybarplaybtn.addEventListener('click', () => {
        const playstyles = window.getComputedStyle(carouselplaybtns[0]);
        const playdisplayValue = playstyles.display;
        const pausestyles = window.getComputedStyle(carouselplaybtns[1]);
        const pausedisplayValue = pausestyles.display;
        const replaystyles = window.getComputedStyle(carouselplaybtns[2]);
        const replaydisplayValue = replaystyles.display;

        // remove button animation's duration
        removesvganimation();

        // if play, carousel plays, btn switches to pause
        if (playdisplayValue == 'block') {
            // move carousel and playbar right
            moveplaybarandcarouselright2(carouselcontent, carouselplaybardots, carouselplaybtns, 5);

            // start progress bar animation
            startprogressbaranimation(carouselplaybaraccesscontainers[0]);
            startpausedprogressbaranimation(carouselplaybaraccesscontainers);

            // change btn icon
            displaypausebtn(carouselplaybtns);
        }

        // if pause, carousel pauses, and btn switches to play
        if (pausedisplayValue == 'block') {
            // stop carousel and playbar
            pauseInterval();

            // stop progress bar
            pauseprogressbaranimation(carouselplaybaraccesscontainers);

            // change btn icon
            displayplaybtn(carouselplaybtns);
        }

        // if replay, carousel scrolls back, playbar scrolls back, and btn switches to pause
        // after move carousel to the very left, start autonav again
        if (replaydisplayValue == 'block') {
            // move carousel left, but wait for 300 first
            timeoutid = setTimeout(() => {
                timeoutid = null;
                movenavcarouseltospecificpos(carouselcontent, 0);
            }, 300);
            
            // move playbar to the very left
            moveplaybardotleft(carouselplaybardots, carouselplaybaraccesscontainers[0], 0);

            // change btn icon
            displaypausebtn(carouselplaybtns);

            // after move to the beginning, start auto nav again to the right
            // wait for 2000 ms first
            let scrollDurationBuffer = 2000;
            timeoutid = setTimeout(() => {
                timeoutid = null;
                // start progress bar
                startpausedprogressbaranimation(carouselplaybaraccesscontainers);
                autonavcarousel(carouselplaybtns, carouselcontent, carouselplaybardots, carouselplaybaraccesscontainers);
            }, scrollDurationBuffer);
        }
    });

    // click playbar dot btn
    carouselplaybardots.forEach((playbardot, index) => {
        playbardot.addEventListener('click', () => {
            // resetdottransitionduration(carouselplaybardots, index, '1s');

            if (index < carouselcurrentindex) {
                // carousel go left

                // move carousel left, but wait for 300 first
                movecarouselbydotnav(moveplaybardotleft, carouselcontent, index, carouselplaybardots, carouselplaybaraccesscontainers, carouselplaybtns);

            } else {
                // carousel go right

                cleanupinterval();

                // move carousel right, but wait for 300 first
                movecarouselbydotnav(moveplaybardotright, carouselcontent, index, carouselplaybardots, carouselplaybaraccesscontainers, carouselplaybtns);
            }

            // resetdottransitionduration(carouselplaybardots, index, '0.5s');
        });
    });

    // click carousel tile
    carouseltiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            //temporately change dot width transition
            //transition: width 0.5s ease-out;

            // resetdottransitionduration(carouselplaybardots, index, '1s');
            
            if (index < carouselcurrentindex) {
                // carousel go left
                // move carousel left, but wait for 300 first
                movecarouselbydotnav(moveplaybardotleft, carouselcontent, index, carouselplaybardots, carouselplaybaraccesscontainers, carouselplaybtns);

            } else {
                // carousel go right
                cleanupinterval();
                // move carousel right, but wait for 300 first
                movecarouselbydotnav(moveplaybardotright, carouselcontent, index, carouselplaybardots, carouselplaybaraccesscontainers, carouselplaybtns);
            }

            // resetdottransitionduration(carouselplaybardots, index, '0.5s');
        })
    });

    //nav carousel by auto
    autonavcarousel(carouselplaybtns, carouselcontent, carouselplaybardots, carouselplaybaraccesscontainers);

    // reveal playbar
    const playbaraccesscontainer = document.querySelectorAll('.playbaraccesscontainer');
    revealrowbyrow(playbaraccesscontainer, 0.5);



    // reveal elements
    const revealelements = document.querySelectorAll('.colcontainer.revealelement');
    revealrowbyrow(revealelements, 0.2);

    // reveal row containers
    const rowContainers = document.querySelectorAll('.rowcontainer');
    revealitembyitem(rowContainers, 0.2);



    // shrink nav
    const navshrink = document.querySelector('.navshrink');
    const toggleoverlaybtn = document.querySelector('.navshrink .toggleoverlaybtn');
    const navshrinkcontent = document.querySelector('.navshrink .navshrinkcontent');
    const navshrinkoverlayitems = document.querySelectorAll('.navshrink .navshrinkoverlay li');
    const leftnavicon = document.querySelector('.navshrink .togglenav .mininav .leftnavicon');
    const leftnavpath = document.querySelector('.navshrink .togglenav .mininav .leftnavpath');
    setshrinkmenuitemnum(navshrinkoverlayitems);

    toggleoverlaybtn.addEventListener('click', () => {
        // close menu
        if (hasClass(navshrink, 'open')) {
            // control toggle btn
            removeClass(navshrink, ' open');

            // control content div scroll y
            document.body.style.overflowY = "auto";

            // menu toggle effect
            if (hasClass(navshrink, 'open2')) {
                removeClass(navshrink, ' open2');
            } 
            if (hasClass(navshrink, 'open2close')) {
                removeClass(navshrink, ' open2close');
            } 
            const newpath2 = "m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z";
            leftnavpath.setAttribute('d', newpath2);
        } else {
            // open menu
            addClass(navshrink, 'open');

            // if put overflow in css, the navshrinkoverlay won't close smoothly
            navshrink.style.overflow = 'visible';

            document.body.style.overflowY = "hidden";

            //shrink nav, secondary menu, mac item
            const shrinknavmacitem = document.querySelector('.navshrink.open .navshrinkoverlay li.macitem');
            shrinknavmacitem.addEventListener('click', () => {
                if (!hasClass(navshrink, 'open2')) {
                    addClass(navshrink, 'open2');
                    if (hasClass(navshrink, 'open2close')) {
                        removeClass(navshrink, ' open2close');
                    } 
                    const newpath = "m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z";
                    leftnavpath.setAttribute('d', newpath);

                    leftnavicon.addEventListener('click', () => {
                        if (hasClass(navshrink, 'open2')) {
                            removeClass(navshrink, ' open2');

                            if (!hasClass(navshrink, 'open2close')) {
                                addClass(navshrink, 'open2close');
                            }

                        }
                        
                    }, {once : true});
                } 
            });
        }
    });

    // Listen for the end of the transition
    navshrinkcontent.addEventListener('transitionend', () => {
        if (!hasClass(navshrink, 'open')) {
            // not showing shrink nav via expanded
            // also not make this into transition section
            // so the height can shrink smoothly
            navshrink.style.overflow = 'hidden';
        }
    });



    // normal nav, secondary menu
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



    // play video/img
    const welcomevideo = document.querySelector('.welcome .content .video-wrapper video');
    const welcomeimg = document.querySelector('.welcome .content .video-wrapper .picture2');
    const welcometitle = document.querySelector('.welcome .content .picture1');
    const scalewelcometitledown = ()=> {
        welcometitle.classList.add('scaledown');
    }
    // 1. Check if the video is already playing
    if (!welcomevideo.paused && !welcomevideo.ended) {
        // If it is, apply the class immediately
        scalewelcometitledown();
    }
    // 2. If it's not playing yet, listen for the 'playing' event
    // The { once: true } ensures the listener runs only once, for good practice
    welcomevideo.addEventListener('playing', scalewelcometitledown, { once: true });

    welcomevideo.addEventListener('ended', () => {
        welcomevideo.pause();
        welcomevideo.style.opacity = 0;
        welcomeimg.style.opacity = 1;

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

        // update big carousl tile style
        calculatetilewidth();

        // keep the current tile center
        centercurrenttile(carouselcontent);
        
        // update wipe scroll overlay style
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


// function scrolltoprevplaybardot() {
//     let carouselindex = 5;
//     const scrollduration = 100;
//     const carouselplaybardots = document.querySelectorAll('.carousel .playbaraccesscontainer .bouncecircle .dot');

//     while (carouselindex >= 0) {
//         removeClass(carouselplaybardots[carouselindex], 'selected');
//         addClass(carouselplaybardots[carouselindex - 1], 'selected');
//         carouselindex--;

//         setTimeout(scrolltoprevplaybardot, scrollduration);
//     }
// }

// function scrolltonexttile() {
//     const carouselminwidth = 280;
//     const carouselmaxwidth = 1680;
//     const scrollbarwidth = 15;
//     const vw = window.innerWidth / 100;
//     const viewportcontent = Math.max(87.5 * vw - scrollbarwidth, carouselminwidth);
//     const tilewidth = Math.min(viewportcontent, carouselmaxwidth);
//     const tilegap = 24;
//     const carouselcontent = document.querySelector('.carousel .bigcarousel');

//     let carouselindex = 5;
//     const scrollduration = 100;
//     const scrolldistance = -(tilewidth + tilegap);
//     if (carouselindex >= 0) {
//         carouselcontent.scrollBy({
//             top: 0,
//             left: scrolldistance,
//             behavior: "smooth"
//         });
//         carouselindex--;

//         setTimeout(scrolltonexttile, scrollduration);
//     }
// }

let carouselcurrentindex = 0;

let intervalid = null;
let timeoutid = null;
const intervaltime = 6000;

let progressbarstartime = 0;
let progressbartimeelapsed = 0;
let progressbarlefttime = 0;

let tilewidth = 0;
const tilegap = 24;

const shortdottransitionduration = '0.2s';
const normaldottransitionduration = '0.5s';
const shortdotintervaltime = 200;
const normaldotintervaltime = 500;
// const totalshortdotintervaltime = 6 * shortdotintervaltime;
// const totalnormaldotintervaltime = 6 * normaldotintervaltime;


function resetdottransitionduration(carouselplaybardots, index, duration) {
    carouselplaybardots[index].style.transitionDuration = duration;
    if (index - 1 >= 0) {
        carouselplaybardots[index - 1].style.transitionDuration = duration;
    }
    if (index + 1 <= 4) {
        carouselplaybardots[index + 1].style.transitionDuration = duration;
    }
}

function calculatetilewidth() {
    const carouselminwidth = 280;
    const carouselmaxwidth = 1680;
    const scrollbarwidth = 15;
    const vw = window.innerWidth / 100;
    const viewportcontent = Math.max(87.5 * vw - scrollbarwidth, carouselminwidth);
    tilewidth = Math.min(viewportcontent, carouselmaxwidth);
}

function centercurrenttile(carouselcontent) {
    const tiles = carouselcontent.querySelectorAll('.tile');
    const currenttile = tiles[carouselcurrentindex];

    if (!currenttile) return 0;
    const offset = getscrolloffsettocenter(currenttile)
    carouselcontent.scrollTo ({
        left: offset,
        behavior: 'auto'
    });
}

function getscrolloffsettocenter(tiletocenter) {
    if (!tiletocenter) return 0;

    const tileleft = tiletocenter.offsetLeft;
    const viewportwidth = window.innerWidth;

    return tileleft - (viewportwidth - tilewidth) / 2;
}

// remove svg's duration after revealed, otherwise the btn will switch slowly
function removesvganimation() {
    const playbarsvgs = document.querySelectorAll(".playbaraccesscontainer.revealed .bouncecircle_right svg");
    playbarsvgs[0].style.animationDuration = '0.5s';
    playbarsvgs[1].style.animationDuration = '0.5s';
    playbarsvgs[2].style.animationDuration = '0.5s';
}

// stop progress bar animation
function pauseprogressbaranimation(carouselplaybaraccesscontainers) {
    if (!carouselplaybaraccesscontainers[0].classList.contains('animationpaused')) {
        carouselplaybaraccesscontainers[0].classList.add('animationpaused');
    }
}

// start progress bar animation
function startpausedprogressbaranimation(carouselplaybaraccesscontainers) {
    if (carouselplaybaraccesscontainers[0].classList.contains('animationpaused')) {
        carouselplaybaraccesscontainers[0].classList.remove('animationpaused');
    }
}

function startprogressbaranimation(carouselplaybaraccesscontainer) {
    if (!carouselplaybaraccesscontainer.classList.contains('revealed2')) {
        carouselplaybaraccesscontainer.classList.add('revealed2');
    }
}

function stopprogressbaranimation(carouselplaybaraccesscontainer) {
    if (carouselplaybaraccesscontainer.classList.contains('revealed2')) {
        carouselplaybaraccesscontainer.classList.remove('revealed2');
    }
}

function shrinkdottransitionduration(carouselplaybardots) {
    carouselplaybardots.forEach((playbardot, index) => {
        playbardot.style.transitionDuration = shortdottransitionduration;
    });
}

function expanddottransitionduration(carouselplaybardots) {
    carouselplaybardots.forEach((playbardot, index) => {
        playbardot.style.transitionDuration = normaldottransitionduration;
    });
}

function cleanupinterval() {
    // 1. Clears the running loop
    if (intervalid !== null) {
        clearInterval(intervalid);
        intervalid = null;
    }
}

function cleanuptimeout() {
    // 2. 🔑 Clears the pending, scheduled restart
    if (timeoutid !== null) {
        clearTimeout(timeoutid);
        timeoutid = null;
    }
}

function startprogressbartime() {
    progressbarstartime = performance.now();
}

function cleanupprogressbartime() {
    progressbarstartime = 0;
    progressbartimeelapsed = 0;
    progressbarlefttime = 0;
}

function isdisplayplaybtn(carouselplaybtns) {
    return carouselplaybtns[0].style.display == 'block';
}
function displayplaybtn(carouselplaybtns) {
    carouselplaybtns[0].style.display = 'block';
    carouselplaybtns[1].style.display = 'none';
    carouselplaybtns[2].style.display = 'none';
}
function displaypausebtn(carouselplaybtns) {
    carouselplaybtns[0].style.display = 'none';
    carouselplaybtns[1].style.display = 'block';
    carouselplaybtns[2].style.display = 'none';
}
function displayrefreshbtn(carouselplaybtns) {
    carouselplaybtns[0].style.display = 'none';
    carouselplaybtns[1].style.display = 'none';
    carouselplaybtns[2].style.display = 'block';
}

function movecarouselbydotnav(callbackFunction, carouselcontent, index, carouselplaybardots, carouselplaybaraccesscontainers, carouselplaybtns) {
    const indexdiff = Math.abs(index-carouselcurrentindex);
    const intervaltime = indexdiff > 1 ? shortdotintervaltime : normaldotintervaltime;
    const totalintervaltime = intervaltime * indexdiff;

    timeoutid = setTimeout(() => {
        timeoutid = null;
        movenavcarouseltospecificpos(carouselcontent, index);
    }, 300);

    callbackFunction(carouselplaybardots, carouselplaybaraccesscontainers[0], index);

    // change btn icon
    if (!isdisplayplaybtn(carouselplaybtns)) {
        displayplaybtn(carouselplaybtns);
    }

    cleanupprogressbartime();

    // change back dot transition duration after carousel moved
    timeoutid = setTimeout(() => {
        timeoutid = null;
        expanddottransitionduration(carouselplaybardots);
    }, totalintervaltime);
}

// move to right functions
function startInterval(callbackFunction, ...args) {
    // be sure to clear interval everytime before starting a new one
    cleanupinterval();
    cleanuptimeout();

    intervalid = setInterval(() => {
        callbackFunction(...args);
    }, intervaltime);
}

function pauseInterval() {
    // be sure to clear interval everytime after 'pausing' an interval
    cleanupinterval();
    cleanuptimeout();
    
    // calculate time elapsed per progress bar
    if (progressbartimeelapsed == 0) {
        // if first time calculate progress bar left time
        progressbartimeelapsed = performance.now() - parseFloat(progressbarstartime);
    } else {
        // if not the first time, then the timeelapsed needs to accumulate
        // progressbarstartime is not the time when progressbar css being added
        // but when resume btn clicks
        progressbartimeelapsed += performance.now() - parseFloat(progressbarstartime);
    }
    
    // calculate time left per progress bar
    progressbarlefttime = intervaltime - progressbartimeelapsed;
}

function resumeInterval(callbackFunction, ...args) {
    // be sure to clear interval everytime before starting a new one
    cleanupinterval();
    cleanuptimeout();

    if (progressbarlefttime > 0) {
        // if the current progressbar is not finished
        // reset progressbar start time to calculate new elapsed time
        progressbarstartime = performance.now();
        
        // wait for the progressbar finishes for 'progressbarlefttime'
        // then start new interval for the next progress bar
        timeoutid = setTimeout(() => {
            // Once this function runs, the timeout has finished, so clear the ID
            timeoutid = null;

            // Execute the function for the first resumed tick
            callbackFunction(...args); 

            // start the full interval immediately after the delay
            intervalid = setInterval(() => {
                callbackFunction(...args);
            }, intervaltime);
            
        }, progressbarlefttime);
        
    } else {
        // If it was fully stopped or not paused precisely, just start it normally
        startInterval(callbackFunction, ...args);
    }
}

function autonavcarousel(carouselplaybtns, carouselcontent, carouselplaybardots, carouselplaybaraccesscontainers) {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('revealed')) {
                    entry.target.classList.add('revealed');
                }
                if (!entry.target.classList.contains('revealed2')) {
                    entry.target.classList.add('revealed2');
                }

                moveplaybarandcarouselright(moveplaybartoveryright, carouselcontent, carouselplaybardots, carouselplaybtns);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    carouselplaybaraccesscontainers.forEach(element => {
        observer.observe(element);
    });
}

function moveplaybarandcarouselright(callbackFunction, ...args) {
    // from autonav
    // be sure to cleanup interval before starting a new one
    cleanupinterval();
    cleanuptimeout();

    intervalid = setInterval(() => {
        callbackFunction(...args);
    }, intervaltime);
}

function moveplaybartoveryright(carouselcontent, carouselplaybardots, carouselplaybtns) {
    let scrollDurationBuffer = 500;
    
    if (carouselcurrentindex >= 5) {
        // cleanup interval after autonav finishes
        cleanupinterval();

        // wait for 500
        // then update ui and cleanup variables
        timeoutid = setTimeout(() => {
            timeoutid = null;
            removesvganimation();
            displayrefreshbtn(carouselplaybtns);
            cleanupprogressbartime();
        }, scrollDurationBuffer);

        return;
    }

    // if carousel not finished
    // move carousel
    carouselcontent.scrollBy({
        top: 0,
        left: tilewidth + tilegap,
        behavior: "smooth"
    });

    // move playbar dots
    removeClass(carouselplaybardots[carouselcurrentindex], 'selected');
    addClass(carouselplaybardots[carouselcurrentindex + 1], 'selected');
    // if start a new progressbar, can clean up all previous progressbar variables
    cleanupprogressbartime();
    // everytime when start a new progress bar, reset progressbar starttime
    progressbarstartime = performance.now();
    carouselcurrentindex ++;
}


function moveplaybarandcarouselright2(carouselcontent, carouselplaybardots, carouselplaybtns, index) {

    resumeInterval(scrollplaybarandcarouselstep, carouselcontent, carouselplaybardots, carouselplaybtns, index);

}

function scrollplaybarandcarouselstep(carouselcontent, carouselplaybardots, carouselplaybtns, index) {
    // comes from resume actions
    let scrollDurationBuffer = 500;

    if (carouselcurrentindex >= index) {
        cleanupinterval();

        timeoutid = setTimeout(() => {
            timeoutid = null;
            removesvganimation();
            displayrefreshbtn(carouselplaybtns);
            cleanupprogressbartime();
        }, scrollDurationBuffer);

        return;
    }

    carouselcontent.scrollBy({
        top: 0,
        left: tilewidth + tilegap,
        behavior: "smooth"
    });

    // move playbar dots
    removeClass(carouselplaybardots[carouselcurrentindex], 'selected');
    addClass(carouselplaybardots[carouselcurrentindex + 1], 'selected');
    // if start a new progressbar, can clean up all previous progressbar variables
    cleanupprogressbartime();
    // calculate new progressbar start time
    progressbarstartime = performance.now();
    carouselcurrentindex++;
}

// move to the very left functions
function moveplaybardotleft(carouselplaybardots, carouselplaybaraccesscontainer, endindex) {
    // won't show detailed playbar
    stopprogressbaranimation(carouselplaybaraccesscontainer);

    if (Math.abs(carouselcurrentindex - endindex) > 1) {
        // shrink dot transition duration
        shrinkdottransitionduration(carouselplaybardots);
    }

    moveplaybarleft(carouselplaybardots, endindex);
}

function moveplaybarleft(carouselplaybardots, endindex) {
    cleanupinterval();
    // cleanuptimeout();

    // const intervaltime = 500;
    let intervaltime = normaldotintervaltime;
    if (Math.abs(carouselcurrentindex - endindex) > 1) {
        intervaltime = shortdotintervaltime;
    }


    intervalid = setInterval(() => {
        if (carouselcurrentindex <= endindex) {
            cleanupinterval();
            return; // Stops all further execution in this tick.
        }

        // need to add and remove one at a time, so can't use settimeout
        removeClass(carouselplaybardots[carouselcurrentindex], 'selected');
        addClass(carouselplaybardots[carouselcurrentindex - 1], 'selected');
        progressbarstartime = performance.now();
        carouselcurrentindex--; 


    }, intervaltime);
}
function moveplaybardotright(carouselplaybardots, carouselplaybaraccesscontainer, endindex) {
    stopprogressbaranimation(carouselplaybaraccesscontainer);

    if (Math.abs(carouselcurrentindex - endindex) > 1) {
        // shrink dot transition duration
        shrinkdottransitionduration(carouselplaybardots);
    }

    moveplaybarright(carouselplaybardots, endindex);
}

function moveplaybarright(carouselplaybardots, endindex) {
    cleanupinterval();
    // cleanuptimeout();

    // const intervaltime = 500;
    let intervaltime = normaldotintervaltime;
    if (Math.abs(carouselcurrentindex - endindex) > 1) {
        intervaltime = shortdotintervaltime;
    }

    intervalid = setInterval(() => {
        if (carouselcurrentindex >= endindex) {
            cleanupinterval();
            return; // Stops all further execution in this tick.
        }

        // need to add and remove one at a time, so can't use settimeout
        removeClass(carouselplaybardots[carouselcurrentindex], 'selected');
        addClass(carouselplaybardots[carouselcurrentindex + 1], 'selected');
        progressbarstartime = performance.now();
        carouselcurrentindex++; 


    }, intervaltime);
}

function movenavcarouseltospecificpos(carouselcontent, leftindex) {

    carouselcontent.scrollTo({
        top: 0,
        left: leftindex * (tilewidth + tilegap),
        behavior: "smooth"
    });
}



function revealgriditembyitem(revealelements, thresholdvalue) {
    const options2 = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdvalue // Trigger when 50% of the row is visible
    };

    // Create a new IntersectionObserver
    const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Loop through the children to apply the staggered animation
                const child = entry.target;
                const index = Array.from(child.parentNode.children).indexOf(child);

                setTimeout(() => {
                    child.classList.add('revealed');
                }, index * 3000); // 150ms delay based on its position in the row
                
                // Stop observing the element once it's revealed
                observer.unobserve(child);
            }
        });
    }, options2);

    // Tell the observer to watch each row container
    revealelements.forEach(element => {
        observer2.observe(element);
    });
}

function revealitembyitem(rowContainers, thresholdvalue) {
    const options2 = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdvalue // Trigger when 50% of the row is visible
    };

    // Create a new IntersectionObserver
    const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all the child elements within the intersecting row
                const children = entry.target.querySelectorAll('.revealelement');

                // Loop through the children to apply the staggered animation
                children.forEach((child, index) => {
                    // Apply a delay based on the child's index
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 200); // 150ms delay between each element
                });

                // Stop observing the row once it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, options2);

    // Tell the observer to watch each row container
    rowContainers.forEach(container => {
        observer2.observe(container);
    });
}

function revealrowbyrow(revealelements, thresholdvalue) {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: thresholdvalue // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is now intersecting the viewport
            if (entry.isIntersecting) {
                // Add the "is-revealed" class to trigger the CSS transition
                entry.target.classList.add('revealed');
                // Stop observing the element once it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Tell the observer to watch each reveal-element
    revealelements.forEach(element => {
        observer.observe(element);
    });
}

function setshrinkmenuitemnum(navshrinkoverlayitems) {
    navshrinkoverlayitems.forEach((item, index) => {
        item.style.setProperty('--flyout-item-number', index);
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
        flycolumns.forEach((column, index) => {
            column.classList.add('is-open');
            const items = column.querySelectorAll('.flyout-item');
            items.forEach((item, index) => {
                // Set a unique CSS variable for each item based on its position (0, 1, 2, ...)
                item.classList.add('is-open');
        });
        });

        const flymenuheight = flymenu.clientHeight;
        secondmenu.style.setProperty('max-height', `${flymenuheight + 56}px`);
        secondmenuoverlay.style.setProperty('opacity', 1);
    })

    navitem.addEventListener('mouseleave', () => {
        flycolumns.forEach((column, index) => {
            column.classList.remove('is-open');
            const items = column.querySelectorAll('.flyout-item');
            items.forEach((item, index) => {
                item.classList.remove('is-open');
        });
        });
        secondmenu.style.setProperty('max-height', '0');
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
        const distancetobottom = welcome.offsetTop + welcome.offsetHeight - navheight - window.scrollY;
        if ((distancetobottom < 100) && (!isnavshow)) {
            fixednav.classList.add('open');
            // fixednav.style.height = '52px';
            // fixednav.style.borderBottomWidth = '1px';
            isnavshow = true;
        } 
        if ((distancetobottom >= 100) && (isnavshow)) {
            // fixednav.style.height = '0';
            // fixednav.style.borderBottomWidth = '0px';
            fixednav.classList.remove('open');
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







