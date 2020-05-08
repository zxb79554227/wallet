export const HANDBOOK_LISK = [
    {
      title: '快速入门',
      items: [
        {
          id: 'firstChapter_firstBurl',
          text: '什么是找回钱包？',
          logo: require("../../assets/icons/zichan.png"),
        },
        {
          id: 'firstChapter_secondBurl',
          text: '如何确保资产安全？',
          logo: require("../../assets/icons/security.png"),
        }
      ]
    },
    {
      title: '如何使用',
      items: [
        {
          id: 'secondChapter_firstBurl',
          text: '如何创建钱包？',
          logo: require("../../assets/icons/create.png")
        },
        {
          id: 'secondChapter_secondBurl',
          text: '如何使用找回合约？',
          logo: require("../../assets/icons/contract.png")
        },
        {
          id: 'secondChapter_thirdBurl',
          text: '如何找回丢失的资产？',
          logo: require("../../assets/icons/assets.png")
        }
      ]
    }
  ]
  
  export const HANDBOOK_DETAILS = [
    {
      id: 'firstChapter_firstBurl',
      title: '什么是找回钱包？',
      content: [
        {
          subTitle: '',
          contexts: ['找回钱包是一款去中心化数字资产钱包。无需助记词，使用手机号码绑定钱包地址，可随时随地通过手机号码找回资产，始终以用户的资产安全作为首要目标，努力打造一款值得信赖、性能强大的去中心化数字钱包。'],
          imgs: [
            {
              width: '100%',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_1.1.png')
            }
          ]
        },
      ]
    },
    {
      id: 'firstChapter_secondBurl',
      title: '如何确保资产安全？',
      content: [
        {
          subTitle: '',
          contexts: ['用户通过绑定找回钱包地址，将资产转入找回合约里，资产由合约代为保管，完全去中心化。用户可以拥有对资产的绝对控制权。'],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_1.2.png')
            }
          ]
        },
      ]
    },
    {
      id: 'secondChapter_firstBurl',
      title: '如何创建钱包？',
      content: [
        {
          subTitle: '①在浏览器里打开“zhaohui.cn”链接。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.1.1.png')
            }
          ]
        },
        {
          subTitle: '②点击“启用找回钱包”创建钱包。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.1.2.png')
            }
          ]
        }
      ]
    },
    {
      id: 'secondChapter_secondBurl',
      title: '如何使用找回合约？',
      content: [
        {
          subTitle: '①将资产转至找回钱包【钱包账户】，将资产由【钱包账户】划转至【合约账户】。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.2.1.png')
            }
          ]
        },
        {
          subTitle: '②点击【我的】→【绑定手机】，输入手机号，获取验证码，绑定手机号，点击【确认】，合约绑定成功，可以开始使用合约。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.2.2.png')
            }
          ]
        }
      ]
    },
    {
      id: 'secondChapter_thirdBurl',
      title: '如何找回丢失的资产？',
      content: [
        {
          subTitle: '①在浏览器里打开“zhaohui.cn”链接。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.3.1.png')
            }
          ]
        },
        {
          subTitle: '②点击“找回钱包资产”，根据弹窗提示，输入原先绑定的手机号，点击【确认】，进去新的找回钱包，界面显示原合约账户资产，资产被找回。',
          contexts: [],
          imgs: [
            {
              width: '257px',
              height: 'auto',
              marginBottom: '20px',
              img: require('../../assets/img/usertutorial_2.3.2.png')
            }
          ]
        }
      ]
    },
  ]