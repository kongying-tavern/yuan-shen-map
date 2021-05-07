import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
export default {
  input:'src/main.ts',
    output:{
        file:'../utils.cjs.js',
        format:'iife',              
        name:'bundleName',
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
        typescript()
    ],
}
