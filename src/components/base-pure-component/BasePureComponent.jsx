import React from 'react'



 export default class BasePureComponent extends React.PureComponent{


    clearIntervals() {
    
        var killId = setTimeout(() => {
            for (var i = killId; i > 0; i--) clearInterval(i)
        }, 1)
    }

    checkResponde = (response) => {
        console.log('ApiUtils', response)
        // console.warn('ApiUtils', response)

        if (response.status === 401) {
            return false
        }
        if (!response.ok) {
            return
        }
        return response.json()
    }



}

