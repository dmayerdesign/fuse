import { Component, OnInit, Input, Output } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OrgService } from './services/org.service';
import { UIHelper, Utilities } from './services/app.service';

@Component({
	selector: 'org-details',
	template: `
			<div class="item-details">
				<img src="{{org.images[0]}}" width="260">
			</div>`,
	providers: [OrgService, UIHelper, Utilities]
})

export class OrgDetailsComponent implements OnInit {
	@Input() org;
	@Output() infoMsg = { body: "", type: "info"};

	constructor(
				private http: Http,
				private orgService: OrgService,
				private helper: UIHelper,
				private utilities: Utilities) {
	}

	ngOnInit() {
		
	}

}