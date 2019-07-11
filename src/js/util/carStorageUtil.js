const CAR_KEY = 'car_key'
export default {

    save(car) {
        window.localStorage.setItem(CAR_KEY, JSON.stringify(car))
    },
    get() {
        const val = window.localStorage.getItem(CAR_KEY) ? window.localStorage.getItem(CAR_KEY) : '[]'
        return JSON.parse(val)
    }
}
