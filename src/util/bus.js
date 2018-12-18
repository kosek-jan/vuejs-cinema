function checkFilter(catergory, title, checked){
    if(checked){
        this[catergory].push(title);
    }else{
        let index = this[catergory].indexOf(title);
        if(index > -1){
            this[catergory].splice(index, 1);
        }
    }
}

export {checkFilter};