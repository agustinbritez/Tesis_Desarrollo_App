import * as Parameters from "./parameters.js";
import {
    CONST_ABI
} from "./abi.js";

// aplicacion para la conexión con la blockchain 
const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || Parameters.provider);

const miContrato = new web3.eth.Contract(CONST_ABI, Parameters.addressContract);

export async function getOrganitation() {
    //se puede usar asi o
    return await miContrato.methods.getOrganitation()
        .call()
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });
    //asi
    // let organitation = miContrato.methods.getOrganitation()
    //     .call((err, result) => result);


}

export async function setOrganitation(_name, _from) {
    await miContrato.methods.setOrganitation(_name).send({
            from: _from
        }, function (error, transactionHash) {

        })
        .on('receipt', function (receipt) {
            // receipt example
            console.log('receipt: ' + receipt);
        });
    return await getOrganitation();
}


export async function getAllEvents(_area_id, _from_address, _from, _to) {
    let cantEvents = await miContrato.methods.getLengthEventsOfArea(_area_id).call((err, result) => {
        result
    });
    //event[0] = eventNull all atributes is in 0
    console.log('cant Event: ' + cantEvents);
    _to = (_to > (cantEvents)) ? cantEvents : _to;
    console.log(_to);
    const events = [];
    var _event = {};
    var _event_id = 0;
    for (let i = _from; i < _to; i++) {

        _event_id = await miContrato.methods.getEventOfArea(_area_id, i).call((err, result) => {
            result;
        });
        _event = await miContrato.methods.getEvent(_event_id).call((err, result) => {
            console.log(result); return result;
        });
        //if id 0 is event null
        if (_event.id) events.push(_event);
        
    }
    console.log(events)
    return events;


}