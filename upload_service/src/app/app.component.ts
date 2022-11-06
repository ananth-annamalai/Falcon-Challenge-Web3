import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'create-metamask';

  ethereum: any
  is_connected = false
  connectedAddress = ''
  eth_balance: number 
  constructor(private authService: AuthService) {
    
  }

  handleAccountsChanged(accounts) {
    console.log(accounts)
    if(accounts.length == 0){
      console.log('here')
      this.is_connected = false
      this.connectedAddress = ''
      this.eth_balance = 0
      this.ethereum = NaN
    }
  }

  openMetaMask(){
    this.authService.signInWithMetaMask().subscribe(
      async (ethereum) => {
        this.ethereum = ethereum
        this.connectedAddress = await ethereum.request({ method: 'eth_requestAccounts' })
        const eth_balance_raw = await ethereum.request({method: 'eth_getBalance',params: [this.connectedAddress[0],"latest"]})
        this.eth_balance = parseInt(eth_balance_raw.result, 16) / Math.pow(10, 18) | 0.0
        this.is_connected = ethereum.connected
        this.ethereum.on('accountsChanged', this.handleAccountsChanged);
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
