import MobileDetect from 'mobile-detect'
import settings from '../configuration/Settings';
import path from "path"
import Hash from "../improve/hash.subscribe"

export const callLater = (callback,delay = 100) => {
  return setTimeout(callback,delay);
}

export const isMobile = () => {
  var mobileDetect = new MobileDetect(window.navigator.userAgent);
  return mobileDetect.mobile();
}

export const isLocal = () => {
  return !(/^h/.test(document.location.toString()));
}

export const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

export const addUniqueToUrl = (url) => {
  if (url) {
    let uStr=new Date().getTime();
    if (url.indexOf("?")<0) {
      url = url+"?u="+uStr;
    } else {
      url = url+"&u="+uStr;
    }
  }
  return url;
}


export const correctUrl = (url) => {

  if (url) {
    if (url.substr(0,1)==="/") {
      url=path.join(settings.assetsUrl,url);
    }
  }

  return url;

}

export const openLink = (link) => {
  window.open(link,"_blank")
}

export const downloadLink = (link) => {

  link=addUniqueToUrl(link);

  let a = document.createElement('a');
  a.href = link;

  link = link.substr(link.lastIndexOf('/') + 1);
  if (link.indexOf('?')>=0) {
    link = link.substr(0,link.indexOf('?'));
  }

  if ((settings.isLocal)&&(link.match(settings.anyImage))) {
    a.target="_blank";
  } else {
    a.download = link;
  }
  a.click();

}


export const formatWeight = (weight) => {
  if (weight==null) {
    return "--Кб"
  }

  weight=Number(weight)
  let output=""

  if (weight>=1000000) {
    output=Math.round(weight*100/1000000)/100+"Мб";
  } else
  if (weight>=1000) {
    output=Math.round(weight*100/1000)/100+"Kб";
  } else {
    output=weight+"б";
  }
  return output
}

export const exportCreatives = (creatives,passStatus) => {
  let creativeList=[];
  for (let name in creatives) {
    let creative=creatives[name];
    creativeList.push(creative);
  }

  creativeList.sort((a,b)=>{
    if (a.section>b.section) return 1;
    if (a.section<b.section) return -1;

    if (a.publisher>b.publisher) return 1;
    if (a.publisher<b.publisher) return -1;

    if (a.formatName>b.formatName) return 1;
    if (a.formatName<b.formatName) return -1;

    if (a.feed>b.feed) return 1;
    if (a.feed<b.feed) return -1;

    if (a.updateTime>b.updateTime) return 1;
    return -1;
  });

  let data=[]
  data.push(
    [
      { value:"Раздел", type:"string" },
      { value:"Площадка", type:"string" },
      { value:"Платформа", type:"string" },
      { value:"Формат", type:"string" },
      { value:"Фид", type:"string" },
      { value:"Статус", type:"string" },
      { value:"Рецензия", type:"string" },
    ]
  );

  for (let i = 0; i < creativeList.length; i++) {
    let creative=creativeList[i];
    data.push(
      [
        { value:creative.section, type:"string" },
        { value:creative.publisher, type:"string" },
        { value:creative.platform, type:"string" },
        { value:creative.formatName, type:"string" },
        { value:creative.feed, type:"string" },
        { value:creative.state, type:"string" },
        { value:passStatus[creative.name]?"Принят":"Не принят", type:"string" },
      ]
    );
  }

  return data;
}

var subscribed = false;

export const initHash = (callback) => {
  if (subscribed) {
    return;
  }
  subscribed=true;

  Hash.init();

  let params=[];
  for (let key in settings.defaultState.viewStatus) {
    params.push(key);
  }
  Hash.subscribe(params, ()=>{
    callback();
  })
}

export const updateHashFromViewStatus = (viewStatus) => {
  let hashes=[];
  for (let key in viewStatus) {
    if (settings.defaultState.viewStatus[key]!==viewStatus[key]) {
      hashes.push(`${key}=${viewStatus[key]}`);
    }
  }
  Hash.mute();
  Hash.setHash("#"+hashes.join("&"));
}

export const hashIsEmpty = () => {
  return (Hash.getHash(false)==="");
}

export const updateViewStatusFromHash = (viewStatus) => {
  let params=Hash.getParams();
  for (let key in params) {
    params[key]=params[key].values.join(",");
  }
  let result={}
  for (let key in viewStatus) {
    if (params[key]) {
      // console.log(params[key],decodeURI(params[key]));
      result[key]=decodeURI(params[key]);
    } else {
      result[key]=viewStatus[key];
    }
  }
  return result;
}

export const makeRequestUrl = (requestId,campName) => {

  campName=campName.replace(/~/g,"[~]");
  campName=campName.replace(/ /g,"~");
  return "/"+requestId+"/"+campName+"/";
}
