import Calculator from '../../../src/mixins/calculator.class'

describe('Calculator', () => {
    it('should return current running total of 0', () => {
        const c1: Calculator = new Calculator()

        expect(c1.total).toEqual(0)
    })

    it('should add input of 1 to running total of 0', () => {
        const c1: Calculator = new Calculator()

        c1.add(1)

        expect(c1.total).toEqual(1)
    })

    it('should subtract input of 1 from running total of 0', () => {
        const c1: Calculator = new Calculator()

        c1.subtract(1)

        expect(c1.total).toEqual(-1)
    })

    it('should multiply input of 2 from running total of 4', () => {
        const c1: Calculator = new Calculator('4')

        c1.multiply(2)

        expect(c1.total).toEqual(8)
    })

    it('should divide running total of 4 by input of 2', () => {
        const c1: Calculator = new Calculator('4')

        c1.divide(2)

        expect(c1.total).toEqual(2)
    })

    it('should return string without spaces', () => {
        const input: string = '1 * 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.equationStr).toBe('1*2')
    })

    it('should return the equation inside an array, inside of an array', () => {
        const input: string = '14 * 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[ '14', '*', '2' ]])
    })

    it('should return the equation inside an array, inside of an array for longer equation', () => {
        const input: string = '1 * 34 / 8'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[['1', '*', '34'], '/', '8' ]])
    })

    it('should return the equation inside an array, inside of an array for a complex bedmas equation', () => {
        const input: string = '489 * 17 * 4 / 8 + 2 / 4'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([ [ [ ["489", "*", "17"], "*", "4"], "/", "8"], "+", ["2", "/", "4",]])
    })

    it('should add 1 + 2 to get a sum of 3', () => {
        const input: string = '1 + 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(3)
    })

    it('should multiply 1 * 2 to get a product of 2', () => {
        const input: string = '1 * 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(2)
    })

    it('should return a total of 5', () => {
        const input: string = '1 + 2 * 4 / 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(5)
    })

    it('should return a total of 1.6666666666666667 with the decimal points', () => {
        const input: string = '5 / 3'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(1.6666666666666667)
    })

    it('should return a total of 8313.5 with the decimal point', () => {
        const input: string = '489 * 17 + 2 / 4'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(8313.5)
    })

    it('should parse inputted parenthesis', () => {
        const input: string = '(1 * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["1", "*", "2"]])
    })

    it('should return bedmas equation', () => {
        const input: string = '(1 + 1) * 2'

        const c1: Calculator = new Calculator(input)
        expect(c1.equation).toEqual([[["1", "+", "1"], "*", "2"]])
    })

    it('should return 4 according to bedmas operations', () => {
        const input: string = '(1 + 1) * 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(4)
    })

    it('should return bedmas equation for complex explicit equation', () => {
        const input: string = '(3*3) + (25 + 15) * 15 - 21'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["3", "*", "3"], "+", [["25", "+", "15"], "*", "15"], "-", "21"])
    }) 

    it('should return 588 according to bedmas operaions', () => {
        const input: string = '(3*3) + (25 + 15) * 15 - 21'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(588)
    })

    it('should return the equation in bedmas form of arrays', () => {
        const input: string = '(1 + 1 * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["1", "+", "1", "*", "2"]])
    })

    it('should return the total of the previous bedmas equation', () => {
        const input: string = '(1 + 1 * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(3)
    })
})