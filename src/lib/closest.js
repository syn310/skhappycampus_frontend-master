const closest = (event, findNode) => {

    let closest = event.target;
    while ((closest = closest.parentElement) && closest.nodeName.toUpperCase() !== findNode.toUpperCase());
    return closest;

}

export default closest