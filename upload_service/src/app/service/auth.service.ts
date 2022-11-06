import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as detectEthereumProvider from '@metamask/detect-provider';
@Injectable({
    providedIn: 'root',
  })

export class AuthService {

    public signInWithMetaMask() {
        let ethereum: any;
        return from(detectEthereumProvider()).pipe(
          switchMap(async (provider) => {
            if (!provider) {
                throw new Error('Please install MetaMask');
              }
      
              ethereum = provider;
      
              return await ethereum;
          })
        );
      }

}