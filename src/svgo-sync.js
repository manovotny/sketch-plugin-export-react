import SVGO from 'svgo';
import {loopWhile as deasync} from 'deasync';

export default (svg) => {
    const svgo = new SVGO();

    let optimized,
        done;

    svgo.optimize(svg, (result) => {
        optimized = result.data;
        done = true;
    });

    deasync(() => {
        return !done;
    });

    return optimized;
}
