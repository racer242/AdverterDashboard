import XLSX from 'xlsx';

class XlsxManager {

  constructor() {
  }

  load(url,callback) {
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = (e) => {
      let arraybuffer = oReq.response;
      let data = arraybuffer;
      let wb;
      let arr = this.fixXlsx(data);
      let btoaValue=btoa(arr);
      wb = XLSX.read(btoaValue, {type: 'base64'});
      callback(this.convertSheetsToTables(wb.Sheets));
    }
    oReq.send();
  }

  fixXlsx(data) {
    let o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
  }

  convertSheetsToTables(data) {
    let result={};
    for (let id in data) {

      if ((id.indexOf("<")===0)&&(id.indexOf(">")===id.length-1)) {
        continue;
      }

      let rows=[];
      let cells=data[id];
      for (let cellId in cells) {
        let y=cellId.substr(1)-1;
        let x=cellId.substr(0,1);//cellId.charCodeAt(0)-("A").charCodeAt(0);
        if (rows[y]==null) {
          rows[y]=[]
        }
        rows[y][x]=cells[cellId].v;
      }
      rows.splice(0,2);

      if (rows.length>1) {
        let indexRow=(rows[0]);
        let lines=[];
        for (let i = 1; i < rows.length; i++) {
          let row=rows[i];
          let fields={};
          for (let fieldId in row) {
            fields[indexRow[fieldId]]=row[fieldId];
          }
          lines.push(fields);
        }
        result[id]=lines;
      }


    }








    return result;
  }

}
export default XlsxManager;
