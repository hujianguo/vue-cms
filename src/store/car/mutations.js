import {ADD2CAR, REMOVECAR, UPDATECAR} from "./types"
import carStorageUtil from '../../js/util/carStorageUtil.js'

export default {
    [ADD2CAR](state, {params}) {
        console.log(params)
        let car = state.car
        let flag = false
        car.some(item => {

            if (parseInt(item.id) === parseInt(params.id)) {
                item.count += params.count
                flag = true
                return true
            }
        })

        if (!flag) {
            car.push(params)
        }

        carStorageUtil.save(car)
    },
    [UPDATECAR](state, {params}) {
        state.car.some(item => {
            if (parseInt(item.id) === params.id) {

                if (params.selected) {
                    item.selected = params.selected
                }

                if (params.count) {
                    item.count = params.count
                }

                return true
            }
        })

        carStorageUtil.save(state.car)
    },
    [REMOVECAR](state, {params}) {
        state.car.some((item, index) => {
            if (parseInt(item.id) === params.id) {
                state.car.splice(index, 1)
                return true
            }
        })

        carStorageUtil.save(state.car)

    }
}