import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import {getUserProfil, updateUserMutation} from '../query';

@Component({
  selector: 'cs-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  f: FormGroup;

  constructor(private fb: FormBuilder,
              private apollo: Apollo) {
  }

  ngOnInit() {

    this.f = this.fb.group({
      id: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      interest: [null, [Validators.required]]
    });

    this.apollo.query({
      query: getUserProfil,
      fetchPolicy: 'network-only'
    })
      .subscribe(({ data }: any) => {
        this.f.patchValue(data.user);
      });

  }

  update(raw: any) {
    this.apollo.mutate({
      mutation: updateUserMutation,
      variables: raw
    }).subscribe(({ data }: any) => {
      this.f.patchValue(data.updateUser);
    });
  }
}
