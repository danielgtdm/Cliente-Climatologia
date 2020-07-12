import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as tf from '@tensorflow/tfjs';
import { NbDialogService } from '@nebular/theme';
import { EntrenandoComponent } from 'src/app/pages/dialogs/entrenando/entrenando.component';


let h = 0;
let m = 0;
let s = 0;

function onBatchEnd(batch, logs) {
  console.log('Accuracy: ' + logs.acc);
  Accuracy = logs.acc;
}

var Accuracy = 5.00002;

// Generate some random fake data for demo purpose.
const xs = tf.randomUniform([10000, 200]);
const ys = tf.randomUniform([10000, 1]);
const valXs = tf.randomUniform([1000, 200]);
const valYs = tf.randomUniform([1000, 1]);

@Component({
  selector: 'app-temperatura-tf',
  templateUrl: './temperatura-tf.component.html',
  styleUrls: ['./temperatura-tf.component.scss']
})
export class TemperaturaTfComponent implements OnInit {

  model = tf.sequential();
  metric = 'accuracy';
  loss = 'meanSquaredError';
  optimizer = 'sgd';
  epochs = 1;
  batchSize = 1;

  public time = '00:00:00';
  public accuracy;
  public currentEpoch;

  prediccion = '';
  private temperaturaArray: Array<any>;
  csv;
  real = '';
  private dialogoConsulta;
  modelCharged;
  toPredict = tf.randomUniform([10000, 200]);

  constructor(
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {

    this.http.get('temperaturas.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.temperaturaArray.push(row);
          }
          console.log(this.temperaturaArray);
        },
        error => {
          console.log(error);
        }
      );

    let onBatchEnd = (batch, logs) =>{

    }

  }

  crono() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) { m++; s = 0; }
    if (m > 59) { h++; m = 0; }
    if (h > 24) { h = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }

    this.time = hAux + ":" + mAux + ":" + sAux;
    setTimeout(() => { this.crono() }, 1000);
  }

  reloadCrono() {
    h = 0;
    m = 0;
    s = 0;

    this.crono();
  }


  async train() {
    this.dialogoConsulta = this.dialogService.open(EntrenandoComponent);
    this.reloadCrono();

    this.model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
    this.model.compile({
      loss: this.loss,
      optimizer: this.optimizer,
      metrics: [this.metric]
    });

    this.prediccion = 'Entrenando'
    await this.model.fit(xs, ys, {
      epochs: this.epochs,
      batchSize: this.batchSize,
      validationData: [valXs, valYs],
      callbacks: {
        onBatchEnd: (batch, logs)=>{
          this.accuracy = logs.acc;
        },
        onEpochBegin: (epoch, logs)=>{
          this.currentEpoch = epoch;
        }
      }
      // Add the tensorBoard callback here.
    }).then(info => {
      this.accuracy = info.history.loss[0];
    
    });
    this.prediccion = 'Termino el entrenamiento';
    this.dialogoConsulta.close();

  }

  csvFile(files: FileList) {
    this.csv = files[0];
    console.log(this.csv.split("\n"));
    alert(this.csv.name);
  }

  predecir() {
    this.modelCharged ?
      this.hacerlo() : alert('primero debes cargar un modelo');
  }
  hacerlo() {
    this.real = ys.toString();
    this.prediccion = this.modelCharged.predict(this.toPredict).toString()
  }

  mostrar() {
    // console.log('shape: ' + this.toPredict.shape);
    // this.toPredict.print();

    // const shape = [2, 2];
    // const b = tf.tensor([1, 2, 3, 4], shape);
    // console.log('shape:', b.shape);
    // b.print();

    // const a = tf.tensor([[1, 2], [3, 4]]);
    // console.log('a shape:', a.shape);
    // a.print();

    // const b = a.reshape([4, 1]);
    // console.log('b shape:', b.shape);
    // b.print();

    // const a = tf.tensor([[1, 2], [3, 4]]);
    // // Returns the multi dimensional array of values.
    // a.array().then(array => console.log(array));
    // // Returns the flattened data that backs the tensor.
    // a.data().then(data => console.log(data));

    // const x = tf.tensor([1, 2, 3, 4]);
    // const y = x.square();  // equivalent to tf.square(x)
    // x.print();
    // y.print();

    // const a = tf.tensor([1, 2, 3, 4]);
    // const b = tf.tensor([10, 20, 30, 40]);
    // const y = a.add(b);  // equivalent to tf.add(a, b)
    // y.print();

    // const a = tf.tensor([[1, 2], [3, 4]]);
    // const y = tf.tidy(() => {
    //   const result = a.square().log().neg();
    //   return result;
    // });
    // console.log('TensorFlow Memory: ' + tf.memory());
    // console.log('TensorFlow Backend: ' + tf.getBackend());  
    // console.log('support 32 bit floating point?: ' + tf.ENV.getBool('WEBGL_RENDER_FLOAT32_CAPABLE'));
    // console.log('is currently using?: ' + tf.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED'));

    this.model.weights.forEach(w => {
      console.log(w.name, w.shape);
    });

  }

  async guardar() {
    const result = await this.model.save('localstorage://my-model');
  }

  async cargar() {
    this.modelCharged = await tf.loadLayersModel('localstorage://my-model');
    alert('modelo cargado');
  }
}
