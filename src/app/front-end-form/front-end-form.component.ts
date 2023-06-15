import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-front-end-form',
  templateUrl: './front-end-form.component.html',
  styleUrls: ['./front-end-form.component.scss']
})
export class FrontEndFormComponent {
  myForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], this.asyncEmailValidator],
    hobbies: this.fb.array([], Validators.required)
  });

  maxDate = new Date();
  frameworks = ['angular', 'react', 'vue'];
  frameworkVersions: { [key: string]: string[] } = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  constructor(private fb: FormBuilder) { }

  asyncEmailValidator(control: FormControl): Observable<any> {
    const existingEmails = ['test@test.test'];

    return new Observable(observer => {
      setTimeout(() => {
        const emailExists = existingEmails.includes(control.value);
        observer.next(emailExists ? { emailExists: true } : null);
        observer.complete();
      }, 2000);
    });
  }

  onFrameworkChange() {
    const framework = this.myForm.get('framework').value;
    const versions = this.frameworkVersions[framework] || [];
    this.myForm.get('frameworkVersion').setValue('');
    if (versions.length > 0) {
      this.myForm.get('frameworkVersion').enable();
    } else {
      this.myForm.get('frameworkVersion').disable();
    }
  }

  get hobbies() {
    return this.myForm.controls['hobbies'] as FormArray;
  }

  addHobby() {
    const hobbyForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required]
    });
    this.hobbies.push(hobbyForm);
  }

  removeHobby(hobbyIndex: number) {
    this.hobbies.removeAt(hobbyIndex);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}
