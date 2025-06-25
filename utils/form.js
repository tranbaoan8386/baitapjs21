import { Product } from "../models/Product.js";

function getElement(id) {
    return document.getElementById(id);
}
export let getDataForm = () =>{
    const id = null;
    const name = getElement("name").value;
    const price = getElement("price").value*1;
    const screen = getElement("screen").value;
    const backCamera = getElement("backCamera").value;
    const frontCamera = getElement("frontCamera").value;
    const img = getElement("img").value;
    const desc = getElement("desc").value;
    const type = getElement("type").value;

    const product = new Product(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    );
    return product;
}