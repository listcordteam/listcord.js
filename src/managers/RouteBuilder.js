const axios = require('axios');
const methods = ['get', 'post'];
const noop = () => {};

module.exports = (client) => {
    var route = 'https://listcord.gg/api';

    return new Proxy(noop, {
        get(target, name){
            if(name == 'toString') return () => route;
            if(methods.includes(name)){
                return async ({ headers = {}, params = {}, body } = {}) => {
                    try{
                        const { data } = await axios({
                            method: name.toUpperCase(),
                            url: route,
                            params,
                            headers: { 
                                Authorization: client.token,
                                ...headers
                            },
                            data: body
                        });

                        return data;
                    }catch(e){
                        client.handleError(e);
                        return null;
                    }
                }
            }
            
            route += `/${name}`;
            return new Proxy(noop, this);
        },
        apply(target, _, args){
            route += `/${args.join('/')}`;
            return new Proxy(noop, this);
        }
    });
}
