const Behavior = {
    agregar:"agregar",
    modificar:"modificar"
}

const BillBhvr = {
    cliente:"Cliente",
    consfin:"Consumidor Final"
}

const typesEnte= {
    cliente:'Cliente',
    proveedor:'Proveedor'
}

const typesPages = {
    one_hundred:{
        size:100,
        link:'/productos/per100page/'
    },
    fifty:{
        size:50,
        link:'/productos/per50page/'
    },
    twenty_five:{
        size:25,
        link:'/productos/per25page/'
    }
}

const typePagesRyM = {
    fifty:{
        size:50,
        linkR:'/rubros/per50page/',
        linkM:'/marcas/per50page/',
    },
    twenty_five:{
        size:25,
        linkR:'/rubros/per25page/',
        linkM:'/marcas/per25page/',
    },
    ten:{
        size:10,
        linkR:'/rubros/per10page/',
        linkM:'/marcas/per10page/',
    }
}

export { Behavior, BillBhvr, typesEnte, typesPages, typePagesRyM }