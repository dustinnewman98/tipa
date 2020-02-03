import { word } from "./types"
import { get } from "./ipa"
import { branner_to_ipa } from "./branner_to_ipa"

interface parse_options {
    use_branner?: boolean;
    use_ipa_sym?: boolean;
    use_ipa_ent?: boolean;
    auto_syllabify_start?: boolean;
    auto_syllabify_end?: boolean;
}

const DEF_OPTS: parse_options = {
    use_branner: false,
    use_ipa_sym: true,
    use_ipa_ent: false,
    auto_syllabify_start: true,
    auto_syllabify_end: true,
}

function split_by_ipa_sym(input: string): string[] {
    return input.split("")
}

function split_by_branner(input: string): string[] {
    return split_by_ipa_sym(branner_to_ipa(input))
}

function split_by_ipa_ent(input: string): string[] {
    return input.split("")
}

export function parse(_input: string, options?: parse_options): word | undefined {
    // Use default options if not provided
    options = options ? { ...DEF_OPTS, ...options } : DEF_OPTS

    // Auto syllabification
    const syllable_break = get("syllable break")
    if (syllable_break) {
        if (options.auto_syllabify_start) {
            if (_input[0] !== syllable_break.ipa_sym && options.use_ipa_sym) {
                _input = syllable_break.ipa_sym + _input
            } else if (_input[0] !== syllable_break.branner && options.use_branner) {
                _input = syllable_break.branner + _input
            } else if (_input[0] !== syllable_break.ipa_ent && options.use_ipa_ent) {
                _input = syllable_break.ipa_ent + _input
            }
        }

        const end = _input[_input.length - 1]
        if (options.auto_syllabify_end) {
            if (end !== syllable_break.ipa_sym && options.use_ipa_sym) {
                _input = _input + syllable_break.ipa_sym
            } else if (end !== syllable_break.branner && options.use_branner) {
                _input = _input + syllable_break.branner
            } else if (end !== syllable_break.ipa_ent && options.use_ipa_ent) {
                _input = _input + syllable_break.ipa_ent
            }
        }
    }

    let input
    if (options.use_ipa_sym) {
        input = split_by_ipa_sym(_input)
    } else if (options.use_branner) {
        input = split_by_branner(_input)
    } else if (options.use_ipa_ent) {
        input = split_by_ipa_ent(_input)
    } else {
        input = _input
    }

    let output: word = []
    const len = input.length
    for (let i = 0; i < len; i++) {
        const sym = get(input[i])
        if (sym !== undefined) {
            output.push(sym)
        } else {
            return undefined
        }
    }

    return output
}