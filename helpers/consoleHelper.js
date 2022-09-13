

const cosoleReader = (args) => {
    const setings = {};
    args.forEach((item, index, array) => {
        if(item[0] == '-') {
            if(index == (array.length - 1)) {
                setings[item.substring(1)] = true;
            }
            else if(array[index + 1] != '-'){
                setings[item.substring(1)] = array[index + 1];
            }
        }
    })
    return setings;
}

export {cosoleReader};