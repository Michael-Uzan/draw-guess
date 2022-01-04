import IPokemon from "../interface/IPokemon.interface";

export const localStorageService = {
    save,
    load
}

function save(key: string, value: IPokemon[]) {
    localStorage[key] = JSON.stringify(value);
}

function load(key: string, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
