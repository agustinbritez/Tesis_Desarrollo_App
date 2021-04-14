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

const miContrato = new web3.eth.Contract(CONST_ABI, Parameters.addressContract_Test);
///************************Organitation***************************** */

export async function setOrganitation(_name, _from) {
    return await Organitation.setOrganitation(_name, _from, miContrato);
}
export async function getOrganitation(_name, _from) {
    return await Organitation.getOrganitation(_name, _from, miContrato);
}

//**************************Event************************************* */

export async function getAllEvents(_area_id=0, _from = 0, _to = -1) {
    if (_area_id > 0) {

        return await Event.getAllEventsOneArea(_area_id, _from, _to, miContrato);
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
export async function getEventOfArea(_from, _to) {
    return await Event.getEventOfArea(_from, _to, miContrato);
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
export async function addDocuments(arrayDocuments, _event_id, _state_id, __reasonState) {
    return await Document.addDocuments(arrayDocuments, _event_id, _state_id, __reasonState, miContrato);
}
export async function editDocuments(arrayDocuments, _event_id, _state_id, __reasonState) {
    return await Document.editDocuments(arrayDocuments, _event_id, _state_id, __reasonState, miContrato);
}

export async function checkDocuments(arrayHashes, arrayDocuments) {
    return await Document.checkDocuments(arrayHashes, arrayDocuments, miContrato);
}

export async function getAllDocuments(_event_id=1,  _state_id=-1,_newVersion=-1,_from = 0, _to = 10) {
    return await Document.getAllDocumentsEvent(_event_id, _from, _to, miContrato);
}
//busca por hash o por evento o por estado, o si tiene version 
export async function getDocument(_hash=-1,_event_id=-1, _state_id=-1,_newVersion=-1) {
    return await Document.getDocument(_hash,_event_id,_state_id,_newVersion, miContrato);
}

export async function getCantDocumentEvent(_event_id = 1) {
    return await Document.getCantDocumentEvent(_event_id, miContrato);
}