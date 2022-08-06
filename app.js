
const cube = document.getElementById("cube");
const panels = document.querySelectorAll(".clickable");

// metrics
const centerDist = 175;
const centerOffset = centerDist * -1;
const defaultCube = `translate3d(0, 0, ${centerOffset}px)rotate3d(1, 5, 0, 15deg)`;
const defaultCubeActive = `translate3d(0, 0, ${centerOffset}px)`;

const panelScale = `scale3d(1.35,1.35,1)`;
const panelDefaultSize = "230"
const panelActiveHeight = `65vh`;
const panelActiveWidth = `65vw`;

const positions = [
    {
        name: "default",
        cubeSetting: defaultCube,
        active: {
            cube: defaultCubeActive,
            panel: {
                transform: `rotate3d(0, 0, 0, 0deg) translate3d(-50%, -50%, ${centerDist}px)${panelScale}`,
                height: panelActiveHeight,
                width: panelActiveWidth
            }
        },
        panel: document.querySelector(`[name=default]`),
        panelSetting: `rotate3d(0, 0, 0, 0deg) translate3d(-50%, -50%, ${centerDist}px)`
    },
    {
        name: "top",
        cubeSetting: `${defaultCube} rotateX(-90deg)`,
        active: null,
        panel: document.querySelector(`[name=top]`),
        panelSetting: `translate3d(-50%, -50%, 0)rotate3d(1, 0, 0, 90deg)translate3d(0, 0, ${centerDist}px)`
    },
    {
        name: "bottom",
        cubeSetting: `${defaultCube} rotateX(90deg)`,
        active: {
            cube: `${defaultCubeActive} rotateX(90deg)`,
            panel: {
                transform: `translate3d(-50%, -50%, 0)rotate3d(1, 0, 0, -90deg)translate3d(0, 0, ${centerDist}px) ${panelScale}`,
                height: panelActiveHeight,
                width: panelActiveWidth
            }
        },
        panel: document.querySelector(`[name=bottom]`),
        panelSetting: `translate3d(-50%, -50%, 0)rotate3d(1, 0, 0, -90deg)translate3d(0, 0, ${centerDist}px) `

    },
    {
        name: "left",
        cubeSetting: `${defaultCube} rotateY(90deg)`,
        active: null,
        panel: document.querySelector(`[name=left]`),
        panelSetting: `translate3d(-50%, -50%, 0)rotate3d(0, 1, 0, -90deg)translate3d(0, 0, ${centerDist}px)`
    },
    {
        name: "right",
        cubeSetting: `${defaultCube} rotateY(-90deg)`,
        active: {
            cube: `${defaultCubeActive} rotateY(-90deg) `,
            panel: {
                transform: `translate3d(-50%, -50%, 0)rotate3d(0, 1, 0, 90deg)translate3d(0, 0, ${centerDist}px) ${panelScale}`,
                height: panelActiveHeight,
                width: panelActiveWidth
            }
        },
        panel: document.querySelector(`[name=right]`),
        panelSetting: `translate3d(-50%, -50%, 0)rotate3d(0, 1, 0, 90deg)translate3d(0, 0, ${centerDist}px)`
    },
    {
        name: "back",
        cubeSetting: `${defaultCube} rotateX(180deg)`,
        active: null,
        panel: document.querySelector(`[name=back]`),
        panelSetting: `rotate3d(1, 0, 0, 180deg)translate3d(-50%, 50%, ${centerDist}px)`
    }
]
let currentPosition = positions[0];
let active = false;

const toggleDisable = (elem, shouldDisable) => {
    if (!elem) return;
    if (shouldDisable)
        elem.classList.add("disabled");
    else
        elem.classList.remove("disabled");
}

const clickPanel = function (e) {

    //is it a current click or <a> click
    const name = (this.attributes[0].value);

    if (name !== currentPosition.name) {
        active = false;
        //disable previous tag
        toggleDisable(currentPosition.panel.querySelector("a"), true);
        currentPosition.panel.style.transform = currentPosition.panelSetting;
        currentPosition.panel.style.height = `${panelDefaultSize}px`;
        currentPosition.panel.style.width = `${panelDefaultSize}px`;

        //enable current tag
        toggleDisable(this.querySelector("a"), false);

        //set new position
        currentPosition = positions.filter(pos => pos.name === name)[0];
        cube.style.transform = currentPosition.cubeSetting;
    } else {
        // do stuff on the current panel
        if (this.classList.contains("info")) {
            active = !active;
            const panelContent = this.querySelector(".panel-content");
            if (active && currentPosition.active) {
                setTimeout(() => panelContent.classList.toggle("active"), 333);
                cube.style.transform = currentPosition.active.cube;
                this.style.transform = currentPosition.active.panel.transform;
                this.style.height = currentPosition.active.panel.height;
                this.style.width = currentPosition.active.panel.width;
            }
            else {
                panelContent.classList.toggle("active");
                cube.style.transform = currentPosition.cubeSetting;
                this.style.transform = currentPosition.panelSetting;
                this.style.width = `${panelDefaultSize}px`;
                this.style.height = `${panelDefaultSize}px`;
            }
        }
    }

}

panels.forEach(panel => panel.addEventListener("click", clickPanel));