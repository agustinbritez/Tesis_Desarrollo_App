


export async function getAllEvents(_area_id, _from_address, _from, _to,miContrato) {
    let cantEvents = await miContrato.methods.getLengthEventsOfArea(_area_id).call((err, result) => {
        result
    });

    //event[0] = eventNull all atributes is in 0
    console.log('cant Event: ' + cantEvents);
    let _to_fin = _from + _to;
    _to_fin = (_to_fin > (cantEvents)) ? cantEvents : _to_fin;
    // console.log(_to);
    // _from > 0 ? _from++ : _from;
    // console.log('_from: ' + _from);
    const events = [];
    var _event = {};
    var _event_id = 0;

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    for (let i = _from; i < _to_fin; i++) {

        _event_id = await miContrato.methods.getEventOfArea(_area_id, i).call((err, result) => {
            result;
        });

        if (parseInt(_event.id) != 0) {

            _event = await miContrato.methods.getEvent(_event_id).call((err, result) => {
                // console.log(result);
                return result;
            });
            _event.startEvent = await miContrato.methods.getStartEvent(_event_id).call((err, result) => {
                return result;
            });
            if (_event.startEvent.year > 0 || _event.startEvent.month > 0 || _event.startEvent.day > 0) {

                _event.startEvent = new Date(_event.startEvent.year, _event.startEvent.month, _event.startEvent.day,
                    _event.startEvent.hour, _event.startEvent.minute, _event.startEvent.second);
            } else {
                _event.startEvent = '';
            }

            _event.endEvent = await miContrato.methods.getEndEvent(_event_id).call((err, result) => {
                return result;
            });

            if (_event.endEvent.year > 0 || _event.endEvent.month > 0 || _event.endEvent.day > 0) {

                _event.endEvent = new Date(_event.endEvent.year, _event.endEvent.month, _event.endEvent.day,
                    _event.endEvent.hour, _event.endEvent.minute, _event.endEvent.second);
            } else {
                _event.endEvent = '';
            }
            // console.log(_event.getEndEvent);
            //if id 0 is event null
            events.push(_event);
            // console.log(_event.getEndEvent.year);
        }

        // await miContrato.methods
        // .addEvent(1, 'event1'+i, 'description 1'+i)
        // .send({
        //         from: account,
        //     },
        //     function (error, transactionHash) {}
        // );
    }
    // console.log('events:' + events.length);

    return events;
}

export async function addEvent(_area_id, _name, _description,miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    await miContrato.methods
        .addEvent(_area_id, _name, _description)
        .send({
                from: account,
            },
            function (error, transactionHash) {}
        );

}

export async function getLengthEventsOfArea(_area_id,miContrato) {
    let _event_length = await miContrato.methods.getLengthEventsOfArea(_area_id).call((err, result) => {
        result;
    });
    return _event_length;
}