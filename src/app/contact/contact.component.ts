import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { ContactService } from '../shared/contact.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': ''
  };
  showForm = true;
  message: string;

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };


  constructor(private fb: FormBuilder,
  private feedbackService: ContactService) {
     this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email:  ['', [Validators.required, Validators.email] ],
      message: '',
    });

    this.feedbackForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    this.showForm = false;
    this.feedbackService.submitContact(this.feedback)
      .subscribe(response => {
		this.message = response.result; 
		console.log(message)
	});
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationMessages[field];
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            this.formErrors[field]  += message[key] + ' ';
          }
        }
    }
  }


}
