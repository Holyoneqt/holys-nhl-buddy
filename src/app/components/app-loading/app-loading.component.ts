import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: 'app-loading.component.html',
    styleUrls: ['app-loading.component.css']
})
export class AppLoadingComponent {

    @Input()
    public width: string = '100px';

}
