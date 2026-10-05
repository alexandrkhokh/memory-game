export default function createEl({ tag = 'div', className, ...attrs } = {}, children = []) {
    const el = document.createElement(tag);

    if(className) {
        el.classList.add(...className.split(' ').filter(Boolean));
    }

    for (const [name, val] of Object.entries(attrs)) {
        if (val === false || val == null) {
            continue
        }

        el.setAttribute(name, val === true ? '' : val)
    }

    el.append(...children)

    return el
}