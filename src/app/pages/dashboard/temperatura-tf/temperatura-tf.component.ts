import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as tf from '@tensorflow/tfjs';
import { NbDialogService } from '@nebular/theme';
import { EntrenandoComponent } from 'src/app/pages/dialogs/entrenando/entrenando.component';

import { TermometroHumedoService } from 'src/app/services/termometro-humedo.service';
import { TermometroSecoService } from 'src/app/services/termometro-seco.service';
import { PresionAtmosfericaService } from 'src/app/services/presion-atmosferica.service';
import { RegistroService } from 'src/app/services/registro.service';

import { Registro } from 'src/app/models/registro';
import { TermometroHumedo } from 'src/app/models/termometro-humedo';
import { TermometroSeco } from 'src/app/models/termometro-seco';
import { PresionAtmosferica } from 'src/app/models/presion-atmosferica';
import { reduce } from 'rxjs/operators';
import * as math from 'mathjs';

let h = 0;
let m = 0;
let s = 0;


// Generate some random fake data for demo purpose.
//const xs = tf.randomUniform([10000, 200]);
//const ys = tf.randomUniform([10000, 1]);
//const valXs = tf.randomUniform([1000, 200]);
//const valYs = tf.randomUniform([1000, 1]);

@Component({
  selector: 'app-temperatura-tf',
  templateUrl: './temperatura-tf.component.html',
  styleUrls: ['./temperatura-tf.component.scss']
})
export class TemperaturaTfComponent implements OnInit {

  private model = tf.sequential();
  private metric = '';
  private loss = '';
  private optimizer = '';
  private epochs = 1;
  private batchSize = 1;
  private trainMean;
  private trainstdesv;
  private validationMean;
  private validationstdesv;

  private trainData = [];
  private trainLabel = [];
  private validationData = [];
  private validationLabel = [];

  private time = '00:00:00';
  private runtime = false;
  private accuracy;
  private currentEpoch;
  private trainLoss;

  private prediccion = '';
  private temperaturaArray: Array<any>;
  private csv;
  private real = '';
  private dialogoConsulta;
  private modelCharged;

  constructor(
    private dialogService: NbDialogService,
    private http: HttpClient,
    private registroService: RegistroService
  ) {

  }

  async ngOnInit() {



    const inicioRango = new Date("01-01-1989");
    const finRango = new Date("03-30-1989");

    let fechas = new Array();
    let listaRegistros: Registro[] = [];

    let aux = inicioRango;
    fechas.push([new Date(+aux)]);

    do {
      aux.setDate(aux.getDate() + 1);
      fechas.push([new Date(+aux)]);
    } while (aux < finRango)

    for (let i = 0; i < fechas.length; i++) {
      const day = fechas[i] as Date;
      var reg = new Registro();
      reg.fecha = day;
      var promesa = await this.registroService.getRegistroByFecha(reg).toPromise()
        .catch(err => {
          console.log('No se ha encontrado la fecha ' + day.toString().substring(0, 15));
        });

      promesa ?
        listaRegistros.push(promesa.payload as Registro) : alert('error');
    }

    for (let index = 0; index < listaRegistros.length - 1; index++) {
      const registro = listaRegistros[index];

      //88 REGISTROS, 44 PARA ENTRENAMIENTO Y 44 PARA VALIDACION
      if (index < 44) {
        this.trainData.push(registro.TermometroSeco.h0830);
        this.trainLabel.push(registro.TermometroHumedo.h0830);
      } else {
        this.validationData.push(registro.TermometroSeco.h0830);
        this.validationLabel.push(registro.TermometroHumedo.h0830);
      }

    }

    this.trainMean = math.round(math.mean(this.trainData), 2);
    this.validationMean = math.round(math.mean(this.validationData), 2);

    this.trainstdesv = math.std(this.trainData).toFixed(2);
    this.validationstdesv = math.std(this.validationData).toFixed(2);

    alert('Listo para entrenar');

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
    if(this.runtime){
      setTimeout(() => { this.crono() }, 1000);
    }
  }

  reloadCrono() {
    h = 0;
    m = 0;
    s = 0;

    this.crono();
  }


  async train() {
    this.runtime = true;
    this.dialogoConsulta = this.dialogService.open(EntrenandoComponent);
    this.reloadCrono();

    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    this.model.compile({
      loss: this.loss,
      optimizer: this.optimizer,
      metrics: [this.metric]
    });

    //TENSORES DE ENTRENAMIENTO
    const tensorX = tf.tensor(this.trainData);
    const tensorY = tf.tensor(this.trainLabel);

    //TENSORES DE VALIDACION
    const validationX = tf.tensor(this.validationData);
    const validationY = tf.tensor(this.validationLabel);

    tensorX.array().then(array => console.log('Train Tensor Data:' + array));
    tensorY.array().then(array => console.log('Train Tensor Label:' + array));

    alert('X tensor shape: ' + tensorX.shape);
    alert('Y tensor shape: ' + tensorY.shape);

    this.prediccion = 'Entrenando'
    await this.model.fit(tensorX, tensorY, {
      epochs: this.epochs,
      batchSize: this.batchSize,
      validationData: [validationX, validationY],
      callbacks: {
        onBatchEnd: (batch, logs) => {
          this.accuracy = logs.accuracy;
          this.trainLoss = logs.loss;
          //console.log(logs.acc);
        },
        onEpochBegin: (epoch, logs) => {
          this.currentEpoch = epoch + 1;
        }
      }
      // Add the tensorBoard callback here.
    }).then(info => {
      this.runtime = false;
      let losses = info.history.loss as number[];
      this.accuracy = losses.reduce((previous, current) => current += previous)/losses.length;
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
    tf.tensor(this.validationLabel).array().then(array => this.real = array.toString());
    const tenPred = this.modelCharged.predict(tf.tensor(this.validationData));
    tenPred.array().then(array => this.prediccion = array);
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
