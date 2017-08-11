import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  encapsulation:ViewEncapsulation.None,
     styles: [`
    .dark-modal .modal-content {
      background-color: #2b669a;
      color: white;
    }
  `],
  templateUrl: './modal.component.html',
  // styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

username:string;
password: string;
    model: any;

  constructor(private modalService:NgbModal) { }

  ngOnInit() {
  }


open(content) {
        this.model = this.modalService.open(content, { windowClass: 'dark-modal',size: 'lg'});
    }

    submit() {
        this.model.close();
    }
}
