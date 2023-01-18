import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm {
static validateFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true});
        }
      if(control instanceof FormGroup){
        this.validateFormFields(control)
      }
    })
    }
}