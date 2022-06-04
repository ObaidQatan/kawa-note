const fs = require('fs');
const path = require('path');

function createStorage(storagePath, andClean){
    if(andClean){
        fs.writeFileSync(storagePath, '{}');
    }else{
        if(!fs.existsSync(storagePath)){
            fs.writeFileSync(storagePath, '{}');
        }
    }
}

class JSONStorage {
    
    #storagePath;

    constructor(storagePath, andClean) {
        this.#storagePath = storagePath? storagePath : path.join(__dirname, './storage.json');

        try {
            createStorage(this.#storagePath, andClean);
        } catch (error) {
            throw new Error("Storage initialization failed!\n"+error.message);
        }
    }

    static fileExists(storagePath) {
        try {
            if(fs.existsSync(storagePath)){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            throw new Error("Something went wrong! ",+error.messeage);
        }
    }

    static readData(storagePath){
        try {
            let dataString = fs.readFileSync(storagePath, 'utf8');
            let data={};
            try {
                data = JSON.parse(dataString);
            } catch (error) {
                throw new Error("Data is not in JSON format! ");
            }
            return data;
        } catch (error) {
            throw new Error("Could not read data!\n"+error.message);
        }
    }

    getDataAll(){
        let dataString = fs.readFileSync(this.#storagePath, 'utf8');
        let data={};
        try {
            data = JSON.parse(dataString);
        } catch (error) {
            throw new Error("Data is not in JSON format! ");
        }
        return data;
    }

    getData(key){
        if(!key)
            return {};
            
        return this.getDataAll()[key.toString()];
    }

    setData(key, value){
        if(!key)
            return false;

        if(typeof(value) === 'undefined')
            value = null;

        let data = this.getDataAll();
        data[key.toString()] = value;
        try {
            fs.writeFileSync(this.#storagePath, JSON.stringify(data));
        } catch (error) {
            return false;
        }
        return true;
    }

    setDataAll(data){
        if(!data)
            return false;
            
        try {
            fs.writeFileSync(this.#storagePath, JSON.stringify(data));
        } catch (error) {
            return false;
        }
        return true;
    }

    clean(){
        try {
            fs.writeFileSync(this.#storagePath, '{}');
            return true;
        } catch (error) {
            return false;
        }
    }
}
module.exports = JSONStorage;