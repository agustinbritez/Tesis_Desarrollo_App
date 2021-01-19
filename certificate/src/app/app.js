import * as Parameters from "./parameters.js";
import * as Organitation from "./Organitation.js";
import * as Event from "./Event.js";
import * as Area from "./Area.js";
import {
    CONST_ABI
} from "./abi.js";

// aplicacion para la conexión con la blockchain 
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || Parameters.provider);

const miContrato = new web3.eth.Contract(CONST_ABI, Parameters.addressContract);
///************************Organitation***************************** */

export async function setOrganitation(_name, _from) {
    return await Organitation.setOrganitation(_name, _from, miContrato);
}
export async function getOrganitation(_name, _from) {
    return await Organitation.getOrganitation(_name, _from, miContrato);
}

//**************************Event************************************* */

export async function getAllEvents(_area_id, _from_address, _from, _to) {
    return await Event.getAllEvents(_area_id, _from_address, _from, _to, miContrato);
}
export async function addEvent(_area_id, _name, _description) {
    return await Event.addEvent(_area_id, _name, _description, miContrato);
}
export async function getLengthEventsOfArea(_area_id) {
    return await Event.getLengthEventsOfArea(_area_id, miContrato);
}


//****************************Areas********************************** */
export async function getAllAreaOfOwner() {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    let account = accounts[0];
    return await Area.getAllAreaOfOwner(account, miContrato);
}