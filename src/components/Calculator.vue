<template>
    <div id="calc">
        <div class="container mx-w-md pt-20">
            <div class="bg-gray-800 w-1/4 mx-auto shadow-xl px-5 py-3 rounded-md">
                <div class="flex justify-between text-gray-600">
                    <p>DouglasDesigns</p>
                    <p>c1</p>
                </div>
                <input type="text" class="w-full h-12 border border-gray-300 bg-white my-6 rounded px-3 text-gray-800" id="numberInput" v-model="input">
                <div id="buttons" class="grid grid-cols-4 gap-4 mt-2 mb-3 h-32xl">
                    <button class="btn btn-secondary" id="pOpenBtn" v-on:click="charBtn('(')">
                        (
                    </button>
                    <button class="btn btn-secondary" id="pCloseBtn" v-on:click="charBtn(')')">
                        )
                    </button>
                    <button class="btn btn-secondary" v-on:click="del()">
                        CE
                    </button>
                    <button class="btn btn-secondary" id="delBtn" v-on:click="clear()">
                        C
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('7')">
                        7
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('8')">
                        8
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('9')">
                        9
                    </button>
                    <button class="btn btn-secondary" id="divBtn" v-on:click="charBtn('/')">
                        ÷
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('4')">
                        4
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('5')">
                        5
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('6')">
                        6
                    </button>
                    <button class="btn btn-secondary" id="mulBtn" v-on:click="charBtn('*')">
                        *
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('1')">
                        1
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('2')">
                        2
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('3')">
                        3
                    </button>
                    <button class="btn btn-secondary" id="subBtn" v-on:click="charBtn('-')">
                        -
                    </button>
                    <button class="btn btn-primary" v-on:click="charBtn('0')">
                        0
                    </button>
                    <button class="btn btn-secondary" v-on:click="charBtn('.')">
                        .
                    </button>
                    <button class="btn bg-green-700" id="divBtn" v-on:click="equals()">
                        =
                    </button>
                    <button class="btn btn-secondary" id="addBtn" v-on:click="charBtn('+')">
                        +
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calculator from '../mixins/calculator.class'

export default defineComponent({
    name: 'Calc',
    data() {
        return {
            input: '',
            total: '',
            num1: null,
            num2: null,
            nextOperation: null
        }
    },
    computed: {
        numOfPar() {
            const parRegex: RegExp = /\(/g
            const input: string = this.input
            
            return (input.match(parRegex) || []).length
        }
    },
    methods: {
        equals() {
            const c1: Calculator = new Calculator(this.input)

            this.total = c1.total.toFixed(7)

            console.log(typeof this.total, this.total)
            this.input = this.total
        },
        del() {
            this.input = this.input.slice(0, -1)
        },
        clear() {
            this.input = ''
            this.total = ''
            this.num1 = null
            this.num2 = null
            this.nextOperation = null
        },
        charBtn(char: string) {
            const reInput: RegExp = /\-*[.0-9+\s\(\)\*\/\+\-]/

            if(char.match(reInput)) this.input = this.input + "" + char
        }
    },
    watch: {
        input(value) {
            const validateCharacters    :RegExp = /^[0-9\+\-\/\*\(\)\%\^]*$/
            const checkSym              :RegExp = /[\+\*\/\-]/
            const checkMultiSym         :RegExp = /[\+\*\/\)\-]{2,}$/
            const closingParRegex       :RegExp = /\)/g
            const valueLen              :number = value.length
            const charEnd               :string = value.charAt(valueLen-1)
            const char2End              :string = value.charAt(valueLen-2)

            // Only allow calculator related characters
            if(!value.match(validateCharacters)) {
                this.input = value.slice(0, -1)
                return
            }

            // Dissallow symbols except ( and - from being the first character inside parenthesis
            if(char2End === "(" &&
               (charEnd === ")" ||
                charEnd === "*" ||
                charEnd === "/" ||
                charEnd === "+")
            ) {
                this.input = value.slice(0, -1)
            }

            // Only allow as many closing parenthesis as there are opening parenthesis
            if((value.match(closingParRegex) || []).length > this.numOfPar) {
                this.input = value.slice(0, -1)
            }

            // If there are 2 or more symbols in a row...
            if(value.match(checkMultiSym)) {
                if(charEnd === "("){
                    return
                }
                else if(char2End.match(checkSym) && charEnd === ")") {
                    this.input = value.slice(0, -1)
                }
                else if(char2End !== ")") {
                    const newSym    :number = value.slice(valueLen-1, valueLen)
                    this.input              = value.slice(0, -2)
                    this.input              = this.input + newSym
                }
            }
        }
    }
})
</script>

<style>

</style>