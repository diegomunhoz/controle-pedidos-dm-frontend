import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO

  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10]

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

      let loader = this.presentLoading()

      this.pedido = this.navParams.get('pedido')

      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required]
      })

      loader.dismiss()
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido})
  }

  private presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
