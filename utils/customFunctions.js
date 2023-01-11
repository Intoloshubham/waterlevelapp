
const checkIfKeyExist = (objectName, keyName) => {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
};

export {checkIfKeyExist};