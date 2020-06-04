import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../core/validators/validator';
import { BodyService } from '../core/services/body.service';
import { FetchService } from '../core/services/fetch.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: ['./form.component.scss'],
  providers: [BodyService, FetchService]
})
export class FormComponent implements OnInit {
    constructor(
      private bodyService: BodyService,
      private fetchService: FetchService) { }
    form: FormGroup;
    date: Date;

    ngOnInit() {
      this.date = new Date();
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          CustomValidators.noWhitespace
        ]),
        surname: new FormControl('', [
          Validators.required,
          CustomValidators.noWhitespace
        ]),
        sex: new FormControl('male', ),
        born: new FormControl('', [
          Validators.required]),
        height: new FormControl(0, [
          Validators.min(30),
          Validators.max(300),
          Validators.required
        ]),
        phoneNumber: new FormControl('', [
          Validators.required,
          CustomValidators.noWhitespace
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required]),
        education: new FormControl('higher'),
        prefferedRegion: new FormControl(''),
        expectedSalary: new FormControl(0, [
          Validators.min(1),
          Validators.required
        ]),
        unemployedFor: new FormGroup({
          unemployedForYears: new FormControl(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.required
          ]),
          unemployedForMonths: new FormControl(0, [
            Validators.min(0),
            Validators.max(11),
            Validators.required
          ])
        }),
        workExperience: new FormGroup({
          workExperienceYears: new FormControl(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.required
          ]),
          workExperienceMonths: new FormControl(0, [
            Validators.min(0),
            Validators.max(11),
            Validators.required
          ]),
        }),
        note: new FormControl(''),
        languageSkills: new FormGroup({
          english: new FormControl(),
          russian: new FormControl(),
          englishProficiency: new FormControl('basic'),
          russianProficiency: new FormControl('basic')
        }),
        professions: new FormGroup({
          trainee: new FormControl(),
          dealer: new FormControl(),
          inspector: new FormControl(),
          manager: new FormControl(),
          pit_boss: new FormControl(),
          waiter: new FormControl(),
          barman: new FormControl(),
        }),
        messengers: new FormGroup({
          WhatsApp: new FormControl(),
          Telegram: new FormControl(),
          Viber: new FormControl(),
          msWhatsApp: new FormControl(),
          msTelegram: new FormControl(),
          msViber: new FormControl(),
        })
      });
    }

    submit() {
      if (this.form.valid) {
        const formData = this.bodyService.convertFormData({...this.form.value});
        this.fetchService.addForm(formData).subscribe(res => console.log(res));
        this.form.reset();
      }
    }
  }
