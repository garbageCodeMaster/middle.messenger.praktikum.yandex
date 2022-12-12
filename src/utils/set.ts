import { merge } from './merge';

type Indexed<T = unknown> = {
    [key in string]: T;
};


export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }  

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    
    const path2 = path.split('.');
    
    let a = path2.reduceRight((acum, el) => {
        return acum = {[el]: acum};
    }, value);

    a = merge(object as Indexed, a as Indexed);
    return a;
}
