import * as Parameters from "./parameters.js";
import * as Organitation from "./Organitation.js";
import * as Event from "./Event.js";
import * as Area from "./Area.js";
import * as State from "./State.js";
import * as Document from "./Document.js";
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
    if (_area_id > 0) {

        return await Event.getAllEventsOneArea(_area_id, _from_address, _from, _to, miContrato);
    } else {

        return await Event.getAllEvents(miContrato);
    }
}
export async function addEvent(_area_id, _name, _description, startDate, endDate) {
    return await Event.addEvent(_area_id, _name, _description, startDate, endDate, miContrato);
}
export async function getEvent(_event_id) {
    return await Event.getEvent(_event_id, miContrato);
}
export async function editEvent(_event_id, _name, _description, startDate, endDate, area_id, sate_id) {
    return await Event.editEvent(_event_id, _name, _description, startDate, endDate, area_id, sate_id, miContrato);
}
export async function getLengthEventsOfArea(_area_id) {
    return await Event.getLengthEventsOfArea(_area_id, miContrato);
}


//****************************Areas********************************** */
export async function getAllAreaOfOwner(_from, _to) {
    return await Area.getAllAreaOfOwner(_from, _to, miContrato);
}

export async function getLengthAreaOfOwner() {
    return await Area.getLengthAreaOfOwner(miContrato);
}
export async function getArea(_id) {
    return await Area.getArea(_id, miContrato);
}
export async function addArea(_owner, _name, _description) {
    return await Area.addArea(_owner, _name, _description, miContrato);
}
export async function editArea(_id_area, _name, _description, state_id) {
    return await Area.editArea(_id_area, _name, _description, state_id, miContrato);
}
export async function changeOwnerArea(_id_area, _owner) {
    return await Area.changeOwnerArea(_id_area, _owner, miContrato);
}
export async function deleteArea(_id_area) {
    return await Area.deleteArea(_id_area, miContrato);
}
//**************************** States ********************************** */
export async function getStatesAll() {
    return await State.getStatesAll(miContrato);
}

//**************************** Document ********************************** */
export async function addDocuments(arrayDocuments) {
    return await Document.addDocuments(arrayDocuments, miContrato);
}