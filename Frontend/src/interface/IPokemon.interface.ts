export default interface IPokemon {
    _id: string,
    name: string,
    img: string,
    weight: number,
    height: number,
    types: string[],
    abilities: string[]
}