const fetch = require("node-fetch");

module.exports = {
    run,
    runMonteCarlo
}

function run(host, {modelName, normal, point, number, cycles=null}) {
    const body = {
        normal: normal || [0, 0, 0],
        point: point,
        number: number,
        cycles: cycles,
        modelName
    }

    return fetch(`${host}/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })        
    .then(res => {
        if(res.status > 200) {
            console.log(res.status, res);
        }

        return res.json()
    })
}

function runMonteCarlo(host, {mc_repeat, mc_center, mc_radius}) {
    const body = {
        repeat: mc_repeat,
        center: mc_center,
        radius: mc_radius 
    }

    console.log('runMonteCarlo: ', body)

    return fetch(`${host}/get/points/montecarlo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })        
    .then(res => {
        if(res.status > 200) {
            console.log(res.status, res);
        }

        return res.json()
    })
}

