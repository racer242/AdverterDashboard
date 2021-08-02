import { isMobile,isLocal } from '../core/helpers';

let assetsUrl = "."

const settings = {
  ...window.settings,

  store:{ },

  developerTitle:"mediasmit.ru",
  developerUrl:"http://www.mediasmit.ru/",
  developerHead:null,
  developerTexts:[
    "Мы создаем digital-продукты, направленные на решение бизнес-задач клиентов",
    "mediasmit.ru",
  ],

  assetsUrl: assetsUrl,

  defaultState:{
    viewStatus:{
    },
    dataLoaded:false,
    loadData:true,
    loadDataError:false,
  },

  isMobile:isMobile(),
  isLocal:isLocal(),
  isDev:(document.location.toString().indexOf("localhost")>0),

  anyImage:/\.(gif|jpg|jpeg|png|svg)$/gi,

  reloadTimeout:10000,
  loadTimeout:5000,
}

export default settings;
