import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lista = [];

  public changeListener(files: FileList){
    console.log(files);    
    if(files && files.length > 0) {
       for (let index = 0; index < files.length; index++) {
         
         let file : File = files.item(index); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file, 'ISO-8859-1');
         reader.onload = (e) => {
            let csv: string = reader.result;
            this.lista.push(this.csvJSON(csv));
         }
      }  
    }
       
  }
  
    //var csv is the CSV file with headers
    csvJSON(csv){
      var lines=csv.split("\n");
    
      var result = [];
    
      var headers=lines[0].split(";");
    
      for(var i=1;i<lines.length;i++){
    
        var obj = {};
        var currentline=lines[i].split(";");
    
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
    
        result.push(obj);
    
      }
      
      //return result; //JavaScript object
      return JSON.stringify(result); //JSON
    }
  }