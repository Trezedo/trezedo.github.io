// 不依赖文档是否渲染完毕，因为是脚本自己创建的
// https://css-tricks.com/playing-with-particles-using-the-web-animations-api/
const clickPop = () => {
    const el: Element = document.body;
    if (document.body.animate && !window["pop"]) {
        // document.body &&
        el.addEventListener("click", pop);
        window["pop"] = 1;
    }

    function pop(e: MouseEvent) {
        // 检查用户是否使用键盘单击了按钮
        if (e.clientX === 0 && e.clientY === 0) {
            const bbox = el.getBoundingClientRect();
            const x = bbox.left + bbox.width / 2;
            const y = bbox.top + bbox.height / 2;
            for (let i = 0; i < 20; i++) {
                // 调用函数 createParticle 20次，传递坐标 x 和 y
                createParticle(x, y);
            }
        } else {
            for (let i = 0; i < 20; i++) {
                // 因为我们需要鼠标的坐标，所以我们将它们作为参数传递
                createParticle(e.clientX, e.clientY);
            }
        }
    }

    function createParticle(x: number, y: number) {
        const particle = document.createElement("particle");
        document.body.appendChild(particle);

        // 5px 到 25px 的随机大小
        const size = Math.floor(Math.random() * 20 + 5);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        // 在蓝色/紫色调色板中生成随机颜色
        particle.style.background = `hsl(${
            Math.random() * 90 + 180
        }, 70%, 60%)`;

        // 在距离鼠标 50px 的范围内生成粒子目的地的随机 x, y 坐标
        const destinationX = x + (Math.random() - 0.5) * 2 * 50;
        const destinationY = y + (Math.random() - 0.5) * 2 * 50;

        // 将动画存储在一个变量中，因为我们以后需要它
        const animation: Animation = particle.animate(
            [
                {
                    // 设置粒子的原点位置
                    // 我们将粒子偏移它的一半大小，使其围绕鼠标居中
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    opacity: 1,
                },
                {
                    // 将最终坐标定义为第二个 keyframe
                    transform: `translate(${destinationX}px, ${destinationY}px)`,
                    opacity: 0,
                },
            ],
            {
                // 将随机持续时间设置为 200 到 800 毫秒
                duration: Math.random() * 800 + 200,
                easing: "cubic-bezier(0, .9, .57, 1)",
                // 每个粒子在 100 毫秒内随机延迟
                delay: Math.random() * 100,
            }
        );

        // 动画完成后，从DOM中删除元素
        animation.onfinish = () => {
            particle.remove();
        };
    }
};
clickPop();
/**
    tsc docs/.vuepress/public/assets/js/pop.ts
    uglifyjs docs/.vuepress/public/assets/js/pop.js -o docs/.vuepress/public/assets/js/pop.js -m
 */
