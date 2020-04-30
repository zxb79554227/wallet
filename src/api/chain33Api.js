
// interface TradeObj{
//     userAddr:String,
//     tradeAmount:Number,
//     execer:String,
//     isToken:Boolean,
//     coin:String,
//     contract:String,
//     fee:Number
// }

export default class chain33Api{
    constructor(){}
    TradeConstructor(chainURL,tradeObj){
        let {userAddr,tradeAmount,execer,isToken,coin,contract,fee} = tradeObj
        if(chainURL){
           console.log(tradeAmount,userAddr,execer,isToken,coin,contract,fee);
        }
    }
}