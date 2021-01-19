export async function getAllAreaOfOwner(_address, miContrato) {
    //se puede usar asi o
    let cantAreaOfOwner = await miContrato.methods.getLengthAreaOfOwner(_address)
        .call((err, result) => result);
    // console.log('cantOwner: '+cantAreaOfOwner);
    let areas = [];
    let area = {};
    for (let index = 0; index < cantAreaOfOwner; index++) {
        var area_id = await miContrato.methods.getAreaOfOwner(_address, index)
            .call((err, result) => result);

        area = await miContrato.methods.getArea(area_id)
            .call((err, result) => result);
        if (area.id) {
            areas.push(area);
        }
    }
    return areas;
}