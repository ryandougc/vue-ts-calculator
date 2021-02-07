export default class Calculator {
    private _total: number = 0
    private _equationStr: string
    private _equation: Array<string>

    constructor(input: string = '') {
        this._equationStr = input
        this._equation =  this.bedmasify(this.strToArray(this._equationStr))
        this._total = this.evaluate(this._equation)
    }

    private strToArray(inputStr: string): Array<any> {
        const splitRegex: RegExp = /(\-*[0-9]+|[\*\/\+\(\)\%\^\-])/     
        const symRegex: RegExp = /[\*\/\^\+\(\-]/
        
        // Split input string into an array
        let inputArray: Array<string> = inputStr.split(splitRegex).filter(val => { if(val && val !== " " ) return val })

        // Parse "-" into subtraction or a negative number
        for(let i=0; i < inputArray.length; i++) {
            if(parseInt(inputArray[i]) < 0) {
                if(!inputArray[i-1].match(symRegex)) {
                    let num: string = (parseInt(inputArray[i]) * -1).toString()

                    inputArray[i] = "-"
                    inputArray.splice(i+1, 0, num)
                }
            }
        }

        // Add multiplication signs infront or behind parenthesis that are next to numbers
        for(let i=0; i < inputArray.length; i++) {
            if((parseInt(inputArray[i]) && inputArray[i + 1] === "(") ||
                inputArray[i] === ")" && parseInt(inputArray[i + 1])) {
                inputArray.splice(i+1, 0, "*")

                i++
            }
        }
        
        return inputArray
    }

    private bedmasify(inputArray: Array<any>): Array<string> {
        let workingArray: Array<any> = JSON.parse(JSON.stringify(inputArray))

        // Loop over the array for each section of Bedmas for order (0 = b, 1 = e, 2 = dm)
        for(let i=0; i < 3; i++) {
            for(let j=0; j < workingArray.length; j++) {
                if(i === 0) {
                    if(workingArray[j] === "(") {
                        const lengthBeforeParenthesis: number = workingArray.length - (workingArray.length - j)
        
                        let arrayBefore = workingArray.splice(0, lengthBeforeParenthesis)
                        workingArray.splice(0, 1) // Remove Opening Parenthesis
                        let recursedArray = this.bedmasify(workingArray.splice(0))
        
                        workingArray = [...arrayBefore, ...recursedArray]

                        j -= 1 
                        continue
                    }
                } else if(i === 1) {
                    if(workingArray[j] === "^") {
                        const lengthBeforeEquation: number = workingArray.length - (workingArray.length - j) - 1
        
                        let arrayBefore: Array<any> = workingArray.splice(0, lengthBeforeEquation)
                        let temp: Array<any> = workingArray.splice(0, 3)
                        let arrayAfter: Array<any> = workingArray.splice(0)
                        
                        workingArray = [...arrayBefore, temp, ...arrayAfter]
        
                        j-= 1
                    } else if (workingArray[j] === "%") {
                        workingArray[j-1] = this.percentage(workingArray[j-1])
        
                        workingArray.splice(j, 1)
                    }
                }else if (i === 2) {
                    if(typeof workingArray[j] === 'object') {
                        continue
                    } else if(workingArray[j].match(/^[\*\/]$/) && workingArray[j+1] !== "(") {
                        const lengthBeforeEquation: number = workingArray.length - (workingArray.length - j) - 1
        
                        let arrayBefore: Array<any> = workingArray.splice(0, lengthBeforeEquation)
                        let temp: Array<any> = workingArray.splice(0, 3)
                        let arrayAfter: Array<any> = workingArray.splice(0)
                        
                        workingArray = [...arrayBefore, temp, ...arrayAfter]
        
                        j-= 1
                    } else if (workingArray[j] === ")") {
                        let temp: Array<any> = workingArray.splice(0, j)
                        workingArray.splice(0, 1) // Remove closing bracket
        
                        return [temp, ...workingArray]
                    }
                }
            }
        }
        return workingArray
    }

    private evaluate(eq: any): number {
        let equation = JSON.parse(JSON.stringify(eq))
        let nextOperation: string = ''
        let subTotal: number = 0
        const reNum: RegExp = /^\-*[0-9]*\.?[0-9]+?$/

        for (let i=0; i < equation.length; i++) {
            if(typeof equation[i] === "object") {
                equation[i] = this.evaluate(equation[i]).toString()
            }

            if(equation[i].match(reNum)) {
                let charInt: number = parseFloat(equation[i])
                 
                if(nextOperation === '*') {
                    subTotal *= charInt
                }
                else if(nextOperation === '/') {
                    subTotal /= charInt
                }
                else if(nextOperation === '+' || nextOperation === '') {
                    subTotal += charInt
                }
                else if(nextOperation === '-') {
                    subTotal -= charInt
                }
                else if(nextOperation === '^') {
                    subTotal = Math.pow(subTotal, charInt)
                }

                nextOperation = ''
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

    public percentage(input: string) {
        const num: number = parseInt(input)
        const percent: number = num * 0.01

        return percent.toString()
    }
}