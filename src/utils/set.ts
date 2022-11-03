type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if ((rhs[p] as Object).constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }  

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    
    let path2 = path.split('.');
    
    let a = path2.reduceRight((acum, el) => {
        return acum = {[el]: acum};
    }, value);

    a = merge(object as Indexed, a as Indexed);
    return a;
}
