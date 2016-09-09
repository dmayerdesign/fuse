import { Component, OnInit, ViewChildren, ViewChild, Input, Output } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OrgService } from './services/org.service';
import { UIHelper, Utilities } from './services/app.service';
import { OrderBy } from './pipes/orderby.pipe.ts';
import { SearchBox } from './search-box.component';

@Component({
	selector: 'orgs-list',
	templateUrl: 'app/browse.orgs.component.html',
	providers: [OrgService, UIHelper, Utilities],
	directives: [SearchBox],
	pipes: [OrderBy]
})

export class BrowseOrgsComponent implements OnInit {
	@ViewChildren('orgsList') $orgs = [];
	@Output() collection:string = "organizations";
	
	private orgs = [];
	private orgsLoaded:number = 10;
	private orgsShowing:number;
	private orgsSorting = {order: "-name"};
	private searchText:string;
	private searchBoxIsFocused:boolean = false;

	private isLoading = true;
	private loadingOrgs = false;
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

	private infoMsg = { body: "", type: "info"};

	constructor(
				private http: Http,
				private orgService: OrgService,
				private helper: UIHelper,
				private utilities: Utilities) {
	}

	ngOnInit() {
		this.helper.setTitle("Browse organizations");

		/** Check for the current order of orgs (i.e. the current value of localStorage.OrgsSorting) **/
		!this.utilities.existsLocally('OrgsSorting')
			? localStorage.setItem('OrgsSorting', JSON.stringify(this.orgsSorting))
			: this.orgsSorting = JSON.parse(localStorage['OrgsSorting']);

		this.orgService.loadOrgs({}).subscribe(
			data => {
				this.isLoading = false;
				this.orgs = data;
				this.takeCount(this.orgs);
			},
			error => console.log(error)
		);
	}

	ngDoCheck() {
		this.takeCount(this.$orgs);
	}

	takeCount(children:any) {
		this.orgsShowing = this.helper.takeCount(children);
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

	toggleOrder(attr) {
		if (this.orgsSorting.order.indexOf(attr) === -1) {
			this.orgsSorting.order = '-' + attr;
		}
		else {
			if (this.orgsSorting.order.indexOf('-') > -1) {
				this.orgsSorting.order = '+' + attr;
			} else {
				this.orgsSorting.order = '-' + attr;
			}
		}
		localStorage.setItem('OrgsSorting', JSON.stringify(this.orgsSorting));
	}

	isAscending(order:string) {
		if (order.indexOf("+") > -1) {
			return true;
		} else {
			return false;
		}
	}

	databaseSearch(search:string) {
		this.loadingOrgs = true;
		this.orgService.loadOrgs({search:search, limit:10})
			.subscribe(
				results => {
					this.orgs = results;
					this.loadingOrgs = false;
					this.searchText = search;
				},
				error => console.error(error)
		);
	}

	showMore(increase:number, offset:number) {
		let search = (localStorage["searching"] == "true") ? this.searchText : "";

		this.orgService.loadOrgs({search: this.searchText, limit: increase, offset: offset}).subscribe(
			res => {
				this.isLoading = false;
				console.log(res);
				this.orgs = this.orgs.concat(res);
				this.takeCount(this.$orgs);
			},
			error => console.log(error)
		);
	}

	toggleSearchBoxFocus(event:string) {
		if (event == 'focus') {
			this.searchBoxIsFocused = true;
		}
		if (event == 'blur') {
			this.searchBoxIsFocused = false;
		}
	}

}