function formatName(name: string) {
    const nameArr: string[] = name.split(" ");
    let formattedName: string = nameArr[0];
    
    for (let i=1; i<nameArr.length; i++){
        if (nameArr[i].length<3){
            continue;
        }
        if (nameArr[i].length>=3 && i!==nameArr.length-1) {
            formattedName = formattedName + " " + nameArr[i][0];
        }
        if (i===nameArr.length-1) {
            formattedName = formattedName + " " + nameArr[i];
        }
    }

    return formattedName.toUpperCase();
}

const employeeService = {
    formatName
};

export default employeeService;