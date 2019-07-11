import {ADD2CAR, REMOVECAR, UPDATECAR} from "./types"

export default {
    [ADD2CAR]({commit}, params) {
        commit(ADD2CAR, {params})
    },
    [REMOVECAR]({commit}, params) {
        commit(REMOVECAR, {params})
    },
    [UPDATECAR]({commit}, params) {
        commit(UPDATECAR, {params})
    }
}