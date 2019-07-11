export default {
    allCount(state) {
        let sum = 0
        state.car.forEach(item => {
            sum += item.count
        })

        return sum
    },
    ids(state) {
        let arr = []
        state.car.forEach(item => {
            arr.push(item.id)
        })

        return arr.join(",")
    },
    mapProp(state) {
        let map = new Map()
        state.car.forEach(item => {
            map.set(parseInt(item.id), item)
        })

        return map
    },
    mapTotal(state) {
        let map = new Map()
        let sum = 0
        let total = 0
        state.car.forEach(item => {
            if (item.selected) {
                sum += item.count
                total += item.count * item.price
            }
        })

        map.set('sum', sum)
        map.set('total', total)
        return map
    }
}