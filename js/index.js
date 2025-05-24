

// window.addEventListener('scroll', () => {
//     const wrapper = document.getElementsByClassName('stickycontainer')[0];
//     const img = document.getElementsByClassName('device')[0];

//     const navcls = document.getElementsByClassName('navcls')[0];
//     const carousel = document.getElementsByClassName('carousel')[0];
//     const carousel2 = document.getElementsByClassName('carousel2')[0];
//     const material = document.getElementsByClassName('material')[0];
//     const ai = document.getElementsByClassName('ai')[0];
//     const camera = document.getElementsByClassName('camera')[0];

//     let topOffset = navcls.offsetHeight + carousel.offsetHeight + carousel2.offsetHeight 
//     + material.offsetHeight + ai.offsetHeight + camera.offsetHeight;
//     console.log(topOffset);
//     wrapper.style.top = `${topOffset}px`;
//     // wrapper.style.top = topOffset;
//     // wrapper.style.top = 300;

//     const scrollY = window.scrollY;
//     const trigger = 600;
//     const relativeScroll = scrollY - topOffset;
//     // Shrink based on scroll (clamp between 1 and 0.4)
//     const scale = Math.max(0.4, 1 - relativeScroll / trigger);
//     img.style.transform = `scale(${scale})`;

//     // When to stop sticking
//     if (scrollY > trigger) {
//       document.body.classList.add('stuck');
//       wrapper.style.top = `${scrollY}px`;
//     } else {
//       document.body.classList.remove('stuck');
//     }
//   });


// window.addEventListener('scroll', () => {
//     const scrollY = window.scrollY;
//     const wrapper = document.getElementById('image-wrapper');
//     const img = document.getElementById('hero-img');

//     // Shrink based on scroll (clamp between 1 and 0.4)
//     const scale = Math.max(0.4, 1 - scrollY / 600);
//     img.style.transform = `scale(${scale})`;

//     // When to stop sticking
//     if (scrollY > 600) {
//       document.body.classList.add('stuck');
//     } else {
//       document.body.classList.remove('stuck');
//     }
//   });

const img = document.getElementsByClassName('devicewrapper')[0];
const container = document.getElementsByClassName('stickycontainer')[0];
const frame = document.getElementsByClassName('frame')[0];

window.onload = function () {
    // img.style.transform = 'scale(1.5) translateY(-200px)';
}



  window.addEventListener('scroll', () => {
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;

    // if ((containerTop > 0) && (containerTop <10)) {
    //     frame.style.display = 'block';
    // }
    console.log('top: '+ containerTop);
    console.log('height: '+ containerHeight);
    const progress = Math.min(Math.max(-containerTop / containerHeight, 0), 1.5);
    // console.log(progress);

    // Scale from 1 to 0.5 as you scroll through the container
    const scale = 1.5 - progress * 1;
    img.style.transform = `scale(${scale})`;
    console.log(scale);
    var topvalue = (10-scale*10)*5;
    if (topvalue > 50) {
        topvalue = 50;
    }
    img.style.top = `${topvalue}%`;
    // console.log(scale);
  });