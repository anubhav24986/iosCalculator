import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import ApiService from './../service/api.service'

interface ResultData {
    result: object
    calc: string
    reflectvalue: boolean
}
//calculatorStore is a mobx store which call endpoint by using axios
export class calculatorStore {
    result: ResultData = { result: {}, calc: '', reflectvalue: false }
    value = '0'
    endpoint = 'http://localhost:3000/'
    method = 'post'

    constructor() {
        makeAutoObservable(this, {
            result: observable,
            calculateResult: action,
        })
    }

    async calculateResult(
        num1: number,
        operator: string,
        num2: number,
        callback: any
    ) {
        try {
            const api = new ApiService(this.endpoint)
            const param = {
                n1: num1,
                n2: num2,
                operator: operator,
            }

            if (this.method === 'post') {
                this.result.reflectvalue = false;
                api.post(this.endpoint, param)
                    .then((value: any) => {
                        runInAction(() => {
                            if (value.result === null) {
                                value.result = 'Error'
                            }
                            this.result.result = value
                            var isDecimal =
                                value.result - Math.floor(value.result) !== 0
                            if (isDecimal)
                                this.value = parseFloat(value.result).toFixed(
                                    2
                                ) 
                            else this.value = value.result

                            this.result.reflectvalue = true;
                            callback();
                        })
                    })
                    .catch((error: string) => {
                        console.error('There was an error!', error);
                    })
            }
        } catch (e) {}
    }
}
export default calculatorStore
