process.on('message', (quantity) => {
    let obj = {}
    for (let i = 0; i <= quantity; i++) {
        let number = Math.floor(Math.random() * 1000 + 1);
        obj[number] 
            ? obj[number]++ 
            : obj[number] = 1
    }
    process.send(obj);
})
