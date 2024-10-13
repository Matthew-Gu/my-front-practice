// 获取DOM元素
const box = document.querySelector('.box')
const text1 = document.querySelector('.text1')
const text2 = document.querySelector('.text2')

// 创建动画序列
ScrollTrigger.create({
  trigger: box,
  start: 'top top', // 触发动画的位置
  end: 'bottom top', // 动画结束的位置
  pin: true,
  markers: true,
})

const t1 = gsap.timeline()

t1.fromTo(
  text1,
  {
    y: '0',
    opacity: 1,
  },
  {
    y: '-50%',
    opacity: 0,
  }
).fromTo(
  text2,
  {
    y: '50%',
    opacity: 0,
  },
  {
    y: '0',
    opacity: 1,
  },
  0.15
)

ScrollTrigger.create({
  animation: t1,
  trigger: text1,
  start: 'top top', // 触发动画的位置
  end: 'bottom top', // 动画结束的位置
  scrub: 1, // 启用滚动时的平滑效果
  markers: true,
})
