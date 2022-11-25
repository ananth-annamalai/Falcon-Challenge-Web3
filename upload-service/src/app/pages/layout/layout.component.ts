import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { BackendService } from "../../service/backend.service";
import { MenuItem } from "primeng/api";


@Component({
  selector: "app-layout",
  styleUrls: ['./layout.component.css'],
  templateUrl: "layout.component.html"
})
export class LayoutComponent implements OnInit, AfterViewInit {
  title = 'create-metamask';
  isCollapsed = true;
  ethereum: any
  is_connected = false
  connectedAddress = ''
  connectedAddressDisplay = ''
  eth_balance: number
  isShowLogin: boolean = true;
  items: MenuItem[];

  constructor(private authService: AuthService, private backendService: BackendService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  handleAccountsChanged(accounts) {
    console.log(accounts)
    if (accounts.length == 0) {
      console.log('here')
      this.is_connected = false
      this.connectedAddress = ''
      this.connectedAddressDisplay = "";
      this.eth_balance = 0
      this.ethereum = null
      this.isShowLogin = true;
    }
  }

  openMetaMask() {
    this.authService.signInWithMetaMask().subscribe(
      async (ethereum) => {
        this.ethereum = ethereum
        this.connectedAddress = await ethereum.request({ method: 'eth_requestAccounts' });
        this.connectedAddressDisplay = this.connectedAddress[0]?.slice(0, 5) + "...." + this.connectedAddress[0].slice(-5);
        const eth_balance_raw = await ethereum.request({ method: 'eth_getBalance', params: [this.connectedAddress[0], "latest"] })
        this.eth_balance = parseInt(eth_balance_raw.result, 16) / Math.pow(10, 18) | 0.0
        this.is_connected = true;
        this.isShowLogin = false;
        this.ethereum.on('accountsChanged', this.handleAccountsChanged);
        this.backendService.is_metamask_connectedSubject.next(true);
        this.setMenuInfo();
      },
      (err) => {
        console.error(err)
        this.isShowLogin = true;
      }
    )
  }

  setMenuInfo() {
    this.items = [{
      label: 'Ehreum',
      items: [{
        label: 'Address :' + "  " + this.connectedAddressDisplay,
        icon: 'pi pi-id-card'
      },
      {
        label: 'Balance :' + "  " + this.eth_balance,
        icon: 'pi pi-wallet'
      }
      ]
    },
    {
      label: 'Navigate',
      items: [{
        label: 'Stream Service',
        icon: 'pi pi-external-link',
        command: () => {
          var streamUrl = window.location.origin + "/" + "stream";
          window.open(streamUrl, "app_stream_page");
        }
      }
      ]
    }
    ];
  }

}
