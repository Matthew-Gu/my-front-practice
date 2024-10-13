const test = gsap.timeline()

test
  .from(
    '.box2',
    {
      yPercent: 100,
    },
    0
  )
  .to('.box1', { yPercent: -10 }, 0)

// 创建一个滚动触发器
ScrollTrigger.create({
  animation: test,
  trigger: '.test', // 触发滚动的元素
  start: 'top top', // 滚动触发的起始位置
  end: '+=' + document.querySelector('.box1').offsetHeight, // 滚动触发的结束位置
  scrub: true,
  pin: true,
  // markers: true, // 可选，用于调试的标记
  onUpdate: (self) => {
    const progress = self.progress
    // gsap.to('.box1', { transform: `translateY(-${10 * progress}%)` })

    gsap.to('.blur', { backdropFilter: `blur(${10 * progress}px)` })
  },
})

const t1 = gsap.timeline()

t1.from('.box4', { xPercent: -100 }).from('.box5', { xPercent: 100 }).from('.box6', { yPercent: -100 })

ScrollTrigger.create({
  animation: t1,
  trigger: '#container',
  start: 'top top',
  end: () => '+=' + document.querySelector('#container').offsetHeight * 4,
  scrub: 1,
  pin: true,
  // markers: true,
})

const sections = gsap.utils.toArray('#vertical>.box')

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '#vertical',
    pin: true,
    scrub: 1,
    // markers: true,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + document.querySelector('#vertical').offsetWidth,
  },
})

gsap.utils.toArray('.comparisonSection').forEach((section) => {
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'center center',
      // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
      end: () => '+=' + section.offsetWidth,
      scrub: true,
      pin: true,
      // pinSpacing: false,
      anticipatePin: 1,
    },
    defaults: { ease: 'none' },
  })
  // animate the container one way...
  t2.fromTo(section.querySelector('.afterImage'), { xPercent: 100, x: 0 }, { xPercent: 0 })
    // ...and the image the opposite way (at the same time)
    .fromTo(section.querySelector('.afterImage img'), { xPercent: -100, x: 0 }, { xPercent: 0 }, 0)
})
