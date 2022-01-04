import IPokemon from "../interface/IPokemon.interface"
import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

async function query(entityType: string, delay = 1100): Promise<any> {
    const entities = JSON.parse(localStorage.getItem(entityType) || 'null')
    return new Promise((resolve) => setTimeout(resolve, delay, entities))
}

async function get(entityId: number, entityType: string): Promise<IPokemon> {
    const entities = await query(entityType)
    const entity = entities.find((entity: any) => entity.id === entityId)
    if (!entity) throw new Error(`Cannot get, Item ${entityId} of type: ${entityType} does not exist`)
    return entity;
}

async function post(newEntity: any, entityType: string): Promise<IPokemon> {
    newEntity = {
        ...newEntity,
        _id: utilService.makeId()
    }
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entities, entityType)
    return newEntity
}

async function put(updatedEntity: any, entityType: string): Promise<IPokemon> {
    const entities = await query(entityType)
    const idx = entities.findIndex((entity: any) => entity.id === updatedEntity.id)
    if (idx < 0) { throw new Error(`Cannot update item, id "${updatedEntity.id}" was not found `) }
    entities[idx] = updatedEntity
    _save(entities, entityType)
    return updatedEntity
}

async function remove(entityId: number, entityType: string): Promise<boolean> {
    const entities = await query(entityType)
    const idx = entities.findIndex((entity: any) => entity.id === entityId)
    if (idx !== -1) entities.splice(idx, 1)
    else throw new Error(`Cannot remove, item id "${entityId}"" of type: ${entityType} does not exist`)
    _save(entities, entityType)
    return true;
}


function _save(entities: IPokemon[], entityType: string) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

