import{mainChainPrefix,paraChainPrefix,GUARDIAN_ADDR,INIT_FUEL_ACCOUNT_PRIKEY,chainNamePrefix} from '../config'
// 处理器转地址
export async function GETEXCADDR(execerName){
    return await fetch(mainChainPrefix,{
        body: JSON.stringify({
           jsonrpc:"2.0",
            id: 1, 
            method:"Chain33.ConvertExectoAddr",
            params:[{execname:execerName}] 
          }),
          method: "POST"
        }).then(response => response.json())
        .then(rlt => {
            if(!rlt.error){
                return rlt.result
            }
        });
}
//查看跨链执行器交易结果
export async function CHECKPARACROSSTRADE(hash){
    return await fetch(mainChainPrefix,{
        body:JSON.stringify({
                method:"Chain33.Query",
                params:[
                    {
                    execer:"paracross",
                    funcName:"GetAssetTxResult",
                    payload:{
                            data:hash
                        }
                    }
                ]
        }),
        method:"POST"
    }).then(response => response.json())
    .then(rlt => {
      if(!rlt.error){
          return rlt
      }
  }); 
}
//查询交易是否成功
export async function CHECKHASHONMAIN(url,hashs){
   return await fetch(url,{
        body: JSON.stringify({
            jsonrpc:"2.0",
            id:2222,
            method:"Chain33.QueryTransaction",
            params:[{hash:hashs}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt
          }
      }); 
}
//slideIn 1 (代扣)
export async function SLIDEINONE(addr,amount,payKey,privkey,isToken,tokenSymbol,fee){
    let create = await fetch(mainChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateRawTransaction",
                params:
                 [
                     {
                         to:addr,
                         amount:amount,
                         isToken,
                         fee,
                         tokenSymbol,
                         execName:"paracross"
                        }
                    ]}
            ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
    
          if(!rlt.error){
              return rlt.result
          }
      }); 

      // 1.5 代扣 
      let payfor = await fetch(mainChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:payKey,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {
   
            let hash = ''
            if(await rlt.result.slice(0,2)==='0x'){
                hash = rlt.result.slice(2)
            }else{
                hash = rlt.result
            }
            return hash;
        });

    //签名
    let sign = await fetch(mainChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
  
            
              return rlt.result
          }
      }); 
    return await fetch(mainChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){  
                
              return rlt.result
          }
      }) 
}
//slideIn 2 (代扣)
export async function SLIDEINTWO(amount,payKey,privkey,isToken,tokenSymbol,fee){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateTransaction",
                params:[
                    {
                        execer:chainNamePrefix+'paracross',
                        actionName:"ParacrossAssetTransfer",
                        payload:{
                            execName:chainNamePrefix+'paracross',
                            to:localStorage.mainAddress,
                            amount:amount,
                            isToken,
                            tokenSymbol,
                            fee
                            }
                        }]
                
            } 
            ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
      
            
          if(!rlt.error){
              return rlt.result
          }
      }); 

    // 1.5 代扣 
    let payfor = await fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:payKey,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {
            if(rlt.result){
                let hash = ''
                if(await rlt.result.slice(0,2)==='0x'){
                    hash = rlt.result.slice(2)
                }else{
                    hash = rlt.result
                }
                return hash;
            }
        });

    //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
       
          if(!rlt.error){           
              return rlt.result
          }
      }) 
}
//slideIn 3 (代扣)
export async function SLIDEINTHREE(addr,amount,payKey,privkey,cointoken){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateTransaction",
                params:[
                    {
                        execer:chainNamePrefix+'paracross',
                        actionName:"TransferToExec",
                        payload:{
                            to:addr,
                            execName:chainNamePrefix+'uwallet',
                            amount,
                            cointoken
                            }
                        }]
                
            } 
            ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
        
            
          if(!rlt.error){
              return rlt.result
          }
      }); 

  // 1.5 代扣 
  let payfor = await fetch(paraChainPrefix, {
    body: JSON.stringify({
        jsonrpc: "2.0",
        id:123,
        method: "Chain33.CreateNoBalanceTransaction",
        params: [{
            txHex: create,
            privkey:payKey,
            expire:"600s"
        }]
    }),
    method: "post"
})
    .then(response => response.json())
    .then(async rlt => {
        let hash = ''
        if(await rlt.result.slice(0,2)==='0x'){
            hash = rlt.result.slice(2)
        }else{
            hash = rlt.result
        }
        return hash;
    });

//签名
let sign = await fetch(paraChainPrefix,{
    body: JSON.stringify({
        id: 123,
        method: "Chain33.SignRawTx",
        params: [
            {
                txHex: payfor,
                privkey: privkey,
                expire: "600s",
                index:2
            }
        ]
    }),
    method: "POST"
  }).then(response => response.json())
    .then(rlt => {
      
      if(!rlt.error){
          return rlt.result
      }
  }); 
return await fetch(paraChainPrefix,{
    body: JSON.stringify({
        id: 123,
        method: "Chain33.SendTransaction",
        params: [{"data": sign}]
    }),
    method: "POST"
  }).then(response => response.json())
    .then(rlt => {
      
      if(!rlt.error){           
          return rlt.result
      }
  }) 
}
//slideout 1（代扣）
export async function SLIDEOUTONE(addr,amount,privkey,cointoken,payKey){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateTransaction",
                params:[
                    {execer:chainNamePrefix+'paracross',
                    actionName:"Withdraw",
                    payload:{
                        to:addr,
                        execName:chainNamePrefix+'uwallet',
                        amount:amount,
                        cointoken:cointoken
                        }
                    }]
            }
            ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    // 1.5 代扣 
    let payfor = await fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:payKey,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {
            let hash = ''
            if(await rlt.result.slice(0,2)==='0x'){
                hash = rlt.result.slice(2)
            }else{
                hash = rlt.result
            }
            return hash;
        });

    //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){           
              return rlt.result
          }
      })
}
//slideout 2（代扣）
export async function SLIDEOUTTWO(myAddr,amount,payKey,privkey,isToken,tokenSymbol){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateTransaction",
                params:[{
                    execer:chainNamePrefix+'paracross',
                    actionName:"ParacrossAssetTransfer",
                    payload:{
                        execName:chainNamePrefix+'paracross',
                        to:myAddr,
                        amount:amount,
                        isWithdraw:true,
                        isToken,
                        tokenSymbol
                        }
                    }]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    // 1.5 代扣 
    let payfor = await fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:payKey,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {
            let hash = ''
            if(await rlt.result.slice(0,2)==='0x'){
                hash = rlt.result.slice(2)
            }else{
                hash = rlt.result
            }
            return hash;
        });

    //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {

          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      })
}
//slideout 3 (代扣)
export async function SLIDEOUTTHREE(addr,amount,payforKey,localKey,isToken,tokenSymbol){
    let create = await fetch(mainChainPrefix, {
        body: JSON.stringify(
            {
                method:"Chain33.CreateRawTransaction",
                params:[{
                        to:addr,
                        amount,
                        isWithdraw:true,
                        execName:"paracross",
                        isToken:isToken,
                        tokenSymbol:tokenSymbol       
                    }]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          
            
          if(!rlt.error){
              return rlt.result
          }
      }); 
            // 1.5 代扣 
            let payfor = await fetch(mainChainPrefix, {
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id:123,
                    method: "Chain33.CreateNoBalanceTransaction",
                    params: [{
                        txHex: create,
                        privkey:payforKey,
                        expire:"600s"
                    }]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
                
                    
                    return hash;
                    } 
                
                });
            //2.2 签名
            let sign = await fetch(mainChainPrefix, {
                body: JSON.stringify({
                    id:123,
                    method: "Chain33.SignRawTx",                    
                    params: [
                        {
                            txHex: payfor,
                            privkey:localKey,
                            expire: "2h",
                            index:2
                        }
                    ]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
         
                    
                    return hash;
                }
                });

            //2.3 发送
            return await fetch(mainChainPrefix, {
                body: JSON.stringify({
                jsonrpc: "2.0",
                id: 5467870898978,
                method: "Chain33.SendTransaction",
                params: [
                    {
                    data: sign
                    }
                ]
                }),
                method: "POST"
            })
                .then(response => response.json())
                .then(async rlt => {
               
                    
                    if(rlt.result){
                    return rlt.result;
                    }
                });
}
//transfer(代扣)
export async function TRANSFERUWALLET(myAddr,toAddr,localKey,payKey,tokenSymbol,amount){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                jsonrpc: "2.0",
                method: "uwallet.CreateRawSendTx",
                params: [{
                    address: myAddr,
                    toAddress: toAddr,
                    exec: "paracross",
                    symbol: tokenSymbol,
                    amount: amount
                }]
            }
            ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
      

          if(!rlt.error){
              return rlt.result
          }
      }); 

    // 1.5 代扣 
    let payfor = await fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:payKey,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {
            let hash = ''
            if(await rlt.result.slice(0,2)==='0x'){
                hash = rlt.result.slice(2)
            }else{
                hash = rlt.result
            }
          
            return hash;
        });

    //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: localKey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
        }).then(response => response.json())
        .then(rlt => {
     
            
          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
         
            
          if(!rlt.error){
              return rlt.result
          }
      }); 
}
//whiteDraw
export async function WITHDRAWMAINCHAIN(param){
    let create = await fetch(mainChainPrefix, {
        body: JSON.stringify({
            jsonrpc:"2.0",
            id:123213,
            method:"Chain33.CreateRawTransaction",
            params:[
                {
                    to:param.addr,
                    amount:param.amount,
                    execer:param.execer,
                    isToken:param.isToken,
                    tokenSymbol:param.tokenSymbol,
                    fee:param.fee
                }
            ]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {

          if(!rlt.error){
              return rlt.result
          }
      }); 

    //签名
    let sign = await fetch(mainChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: create,
                    privkey: param.privkey,
                    expire: "600s"
                }
            ]
        }),
        method: "POST"
        }).then(response => response.json())
        .then(rlt => {

          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(mainChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {

          if(!rlt.error){

              return rlt.result
          }
      }); 
}

//获取余额
export async function getTokenBalance(params){
    if(params.url === main){
        await fetch(mainChainPrefix, {
            body: JSON.stringify({
              id: 11121212121,
              method: "Chain33.GetBalance",
              params: [
                {
                  addresses: [localStorage.mainAddress],
                  execer: params.execer,
                  asset_exec: params.assetExec,
                  asset_symbol: params.coinName
                }
              ]
            }),
            method: "POST"
          }).then((res)=>{
              return res.json()
          }).then(rlt =>{
              return rlt
          })
    }else{
        await fetch(paraChainPrefix, {
            body: JSON.stringify({
              id: 11121212121,
              method: "Chain33.GetBalance",
              params: [
                {
                  addresses: [localStorage.mainAddress],
                  execer: params.execer,
                  asset_exec: params.assetExec,
                  asset_symbol: params.coinName
                }
              ]
            }),
            method: "POST"
          }).then((res)=>{
              return res.json()
          }).then(rlt =>{
              return rlt
          })
    }
}



//找回钱包功能================================================================
//===============================================


//绑定手机，开启找回
export async function addBandRetrieve(addr,privkey){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                jsonrpc: "2.0",
                method: "uwallet.CreateRawAddTx",
                params: [{
                    address: addr,
                    guardian: GUARDIAN_ADDR,
                    retrieveDelay: 10,
                    remark: "test"
                }]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    // 1.5 代扣 
    let payfor = await fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id:123,
            method: "Chain33.CreateNoBalanceTransaction",
            params: [{
                txHex: create,
                privkey:INIT_FUEL_ACCOUNT_PRIKEY,
                expire:"600s"
            }]
        }),
        method: "post"
    })
        .then(response => response.json())
        .then(async rlt => {

            
            let hash = ''
            if(await rlt.result.slice(0,2)==='0x'){
                hash = rlt.result.slice(2)
            }else{
                hash = rlt.result
            }
            return hash;
        });

    //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {

          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      })
}
//设置币种信息（开机必用，否则无法找回）
       /**
         * 设置币种限额(代扣模式)
         */
export async function setCoinLimit(symbol,limitNum,payforKey,localKey){
            let createRlt = await fetch(paraChainPrefix, {
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: "uwallet.CreateRawAssetTx",
                    params: [{
                        address: localStorage.mainAddress,
                        exec: "paracross",
                        symbol: symbol,
                        limit: limitNum
                    }]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {  
           
                    
                    if(!rlt.error && rlt.result){
                        let hash = ''
                        if(await rlt.result.slice(0,2)==='0x'){
                            hash = rlt.result.slice(2)
                        }else{
                            hash = rlt.result
                        }                       
                        return hash;
                    }  
                });
            // 1.5 代扣 
            let payfor = await fetch(paraChainPrefix, {
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id:123,
                    method: "Chain33.CreateNoBalanceTransaction",
                    params: [{
                        txHex: createRlt,
                        privkey:payforKey,
                        expire:"600s"
                    }]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
               
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
                    return hash;
                    } 
                });
            //2.2 签名
            let sign = await fetch(paraChainPrefix, {
                body: JSON.stringify({
                    id:123,
                    method: "Chain33.SignRawTx",                    
                    params: [
                        {
                            txHex: payfor,
                            privkey:localKey,
                            expire: "2h",
                            index:2
                        }
                    ]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
                  
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
                    return hash;
                }
                });

            //2.3 发送
            await fetch(paraChainPrefix, {
                body: JSON.stringify({
                jsonrpc: "2.0",
                id: 5467870898978,
                method: "Chain33.SendTransaction",
                params: [
                    {
                    data: sign
                    }
                ]
                }),
                method: "POST"
            })
                .then(response => response.json())
                .then(async rlt => {
                    if(rlt.result){
                    return rlt;
                    }
                });
}




//获取币种信息
export async function getTokenInfo(coinNames){
    await fetch(
        "https://oldmainnet.bityuan.com/coin/h5/coin/coin-info-by-names",
        {
          body: JSON.stringify({
            names: [coinNames]
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }
      )
        .then(res => res.json())
        .then(rlt=>{
            if(!rlt.error){
                return rlt
            }
        })
}

//查看钱包状态
export async function checkWalletStatus(addr){
    return fetch(paraChainPrefix, {
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 121232323232,
            method: "Chain33.Query",
            params: [
            {
                execer: chainNamePrefix+'uwallet',
                funcName: "GetUWalletInfo",
                payload: {
                address: addr
                }
            }
            ]
        }),
        method: "post"
        })
        .then(response => response.json())
        .then(rlt => {
            return rlt;
        });
}
//添加联系人(代扣)
export async function addContacts(contactAddr,contactName,payforKey,privkey){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                jsonrpc: "2.0",
                method: "uwallet.CreateRawSetContactTx",
                params: [{
                    address: contactAddr,
                    remark: contactName
                }]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
            // 1.5 代扣 
            let payfor = await fetch(paraChainPrefix, {
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id:123,
                    method: "Chain33.CreateNoBalanceTransaction",
                    params: [{
                        txHex: create,
                        privkey:payforKey,
                        expire:"600s"
                    }]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
                    console.log(hash);
                    return hash;
                    } 
                
                })
                 //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){           
              return rlt.result
          }
      })
}
//删除联系人（代扣）
export async function deleteContact(contactAddr,payforKey,privkey){
    let create = await fetch(paraChainPrefix, {
        body: JSON.stringify(
            {
                jsonrpc: "2.0",
                method: "uwallet.CreateRawDeleteContactTx",
                params: [{
                    address: contactAddr
                }]
            }
        ),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
            // 1.5 代扣 
            let payfor = await fetch(paraChainPrefix, {
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id:123,
                    method: "Chain33.CreateNoBalanceTransaction",
                    params: [{
                        txHex: create,
                        privkey:payforKey,
                        expire:"600s"
                    }]
                }),
                method: "post"
            })
                .then(response => response.json())
                .then(async rlt => {
                    if(rlt.result){
                    let hash = ''
                    if(await rlt.result.slice(0,2)==='0x'){
                        hash = rlt.result.slice(2)
                    }else{
                        hash = rlt.result
                    }
                    console.log(hash);
                    return hash;
                    } 
                
                })
                 //签名
    let sign = await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SignRawTx",
            params: [
                {
                    txHex: payfor,
                    privkey: privkey,
                    expire: "600s",
                    index:2
                }
            ]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){
              return rlt.result
          }
      }); 
    return await fetch(paraChainPrefix,{
        body: JSON.stringify({
            id: 123,
            method: "Chain33.SendTransaction",
            params: [{"data": sign}]
        }),
        method: "POST"
      }).then(response => response.json())
        .then(rlt => {
          if(!rlt.error){           
              return rlt.result
          }
      })
}