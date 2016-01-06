import lru from 'lru-cache';
const components = {};
const componentTypes = {};

let componentIdGeneratorIndex = 0;
let componentTypeIdGeneratorIndex = 0;


export function use(componentDescription) {
    return (componentDescription._id && components[componentDescription._id]) | create(componentDescription).use();
}

export function create(componentDescription) {
    componentDescription._id |= ++componentIdGeneratorIndex;
    componentDescription.type._id |= ++componentTypeIdGeneratorIndex;
    componentDescription._refs = 0;
    componentDescription.use = () => {
        componentDescription._refs++;
    };
    componentDescription.unuse = () => {
        componentDescription._refs--;
    };
    let componentLRU = componentTypes[componentDescription.type._id] | lru(50);


    return component.apply(component, componentDescription.props);
}


