export default class Calculator {
    private _total: number = 0
    private _equationStr: string
    private _equation: Array<string>

    constructor(input: string = '') {
        this._equationStr = this.cleanInput(input)
        this._equation =  this.bedmasify(this._equationStr)
        this._total = this.evaluate(this._equation)
    }

    private cleanInput(input: string): string {
        return input.replace(/\s+/g, "")
    }

    private bedmasify(equationStr: string): Array<string> {
        let inputArray: Array<string> = equationStr.split(/([0-9]+|[\*\/\+\-])/).filter(val => { return val })
        let bedmasArray: Array<any> = [...inputArray]
 
        for(let i=0; i < bedmasArray.length; i++) {
            if(bedmasArray[i] === "(") {
                for(let j=i+1; j < bedmasArray.length; j++) {
                    if(bedmasArray[j] === ")") {
                        let arrayBefore: Array<any> = bedmasArray.splice(0, i)
                        j -= arrayBefore.length
                        let temp: Array<any> = bedmasArray.splice(1, j-1)
                        bedmasArray.splice(0, 2) // Remove parenthesis
                        let arrayAfter: Array<any> = bedmasArray.splice(0, bedmasArray.length)

                        bedmasArray = [...arrayBefore, temp, ...arrayAfter]

                        break
                    }
                }
                continue
            }
            if(bedmasArray[i].match(/^[\*\/]$/)) {
                let arrayBefore: Array<any> = bedmasArray.splice(0, i-1)
                let temp: Array<any> = bedmasArray.splice(0, 3)
                let arrayAfter: Array<any> = bedmasArray.splice(0, bedmasArray.length)

                bedmasArray = [...arrayBefore, temp, ...arrayAfter]

                i-= 1
            }
        }

        return bedmasArray
    }

    private evaluate(eq: any): number {
        let equation = JSON.parse(JSON.stringify(eq))
        let nextOperation: string = ''
        let subTotal: number = 0
        const reNum: RegExp = /^[0-9]*\.?[0-9]+?$/

        for (let i=0; i < equation.length; i++) {
            if(typeof equation[i] === "object") {
                equation[i] = this.evaluate(equation[i]).toString()
            }

            if(equation[i].match(reNum)) {
                let charInt: number = parseFloat(equation[i])
                 
                if(nextOperation === '+' || nextOperation === '') {
                    // this.add(charInt)
                    subTotal += charInt
                }
                else if(nextOperation === '-') {
                    // this.subtract(charInt)
                    subTotal -= charInt
                }
                else if(nextOperation === '*') {
                    // this.multiply(charInt)
                    subTotal *= charInt
                }
                else if(nextOperation === '/') {
                    // this.divide(charInt)
                    subTotal /= charInt
                }
            }
            else {
                nextOperation = equation[i]
            }
        }
        return subTotal
    }

    public get total(): number {
        return this._total
    }

    public get equationStr(): string {
        return this._equationStr
    }

    public get equation(): Array<string> {
        return this._equation
    }

    public add(input: number) {
        this._total += input
    }

    public subtract(input: number) {
        this._total -= input
    }

    public multiply(input: number) {
        this._total *= input
    }

    public divide(input: number) {
        this._total /= input
    }

    public static generateEquation(length: number): string {
        let numTracker: any = null
        let result: string = ''
        let min:number = 1
        let max: number = 4
        let numSize: number = length % 2 === 0 && !numTracker ? 100 : 10

        for (let i=0; i < length; i++) {
            let char

            if(numTracker) {
                numTracker = false

                let symNum = Math.floor(Math.random() * (max - min) + min)

                if(symNum === 1) {
                    char = '+'
                }else if(symNum === 2) {
                    char = '-'
                }else if(symNum === 3) {
                    char = '*'
                }else if(symNum === 4) {
                    char = '/'
                }
            }else {
                numTracker = true

                char = Math.floor(Math.random() * numSize)
            }


            result += char
        }

        return result
    }
}