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

        expect(c1.equation).toEqual([[["1", "*", "2"]]])
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

        expect(c1.equation).toEqual([[["3", "*", "3"]],  "+", [["25", "+", "15"], "*", "15"], "-", "21"])
    }) 

    it('should return 588 according to bedmas operaions', () => {
        const input: string = '(3*3) + (25 + 15) * 15 - 21'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(588)
    })

    it('should return the equation in bedmas form of arrays', () => {
        const input: string = '(1 + 1 * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["1", "+", ["1", "*", "2"]]])
    })
    
    it('should parse parenthesis inside of parenthesis', () => {
        const input: string = '((1 + 1) * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[[["1", "+", "1"], "*", "2"]]])
    })

    it('should return 4 with brackets inside of brackets', () => {
        const input: string = '((1 + 1) * 2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(4)
    })

    it('should return 16 with brackets inside of brackets and other brackets', () => {
        const input: string = '((1 + 1) * 2) + (4 * 3)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(16)
    })

    it('should return 65 for a complicated bedmas equation', () => {
        const input: string = '(8*8)+4-(3*1)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(65)
    })

    it('should return -1', () => {
        const c1: Calculator = new Calculator()

        c1.add(-1)

        expect(c1.total).toEqual(-1)
    })

    it('should return -4', () => {
        const input: string = '2 * -2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(-4)
    })

    it('should return equation for complicated bedmas string with 1 negatives and 3 subtraction', () => {
        const input: string = '(2 * -2) - (2 * (26 + 42)) - 22 - 4'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[["2", "*", "-2"]], "-", [["2", "*", ["26", "+", "42"]]], "-", "22", "-", "4"])
    })

    it('should return equation for complicated bedmas string with 2 negatives and 2 subtraction', () => {
        const input: string = '(2 * -2) - (2 * (26 + 42)) * -22 - 4'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[["2", "*", "-2"]], "-", [[["2", "*", ["26", "+", "42"]]], "*", "-22"], "-", "4"])
    })

    it('should return -166', () => {
        const input: string = '(2 * -2) - (2 * (26 + 42)) - 22 - 4'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(-166)
    })

    it('should return a multiplication string for parenthesis multiplication', () => {
        const input: string = '2 (-2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["2", "*", ["-2"]]])
    })

    it('should return -4 for parenthesis multiplication', () => {
        const input: string = '2 (-2)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(-4)
    })

    it('should return a multiplication string for parenthesis multiplication', () => {
        const input: string = '(-2) 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([[["-2"], "*", "2"]])
    })

    it('should return -4 for parenthesis multiplication', () => {
        const input: string = '(-2) 2'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(-4)
    })

    it('should parse a power into an equation', () => {
        const input: string = '2^4'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["2", "^", "4"]])
    })

    it('should parse a complicated equation with exponents into an equation', () => {
        const input: string = '4 * 1 + 2^4'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["4", "*", "1"], "+", ["2", "^", "4"]])
    })

    it('should return 10 for an equation with exponents', () => {
        const input: string = '4 * 1 + 2^4'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(20)
    })

    it('should return 1048576 while calculating a power', () => {
        const input: string = '16^5'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(1048576)
    })

    it('should convert the percentage into a decimal value', () => {
        const input: string = '5%'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual(["0.05"])
    })

    it('should convert the percentage into a decimal value inside an equation', () => {
        const input: string = '5 * 5% + (4^5 - 1)'

        const c1: Calculator = new Calculator(input)

        expect(c1.equation).toEqual([["5", "*", "0.05"], "+", [["4", "^", "5"], "-", "1"]])
    })

    it('should return 1023.25 for an equation with a percentage and an exponent', () => {
        const input: string = '5 * 5% + (4^5 - 1)'

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(1023.25)
    })

    it('should return 256 for an equation with subtraction at the end', () => {
        const input: string = '2+(4^4)-2' // Equation without spaces see all minus symbols as negatives

        const c1: Calculator = new Calculator(input)

        expect(c1.total).toEqual(256)
    })
})