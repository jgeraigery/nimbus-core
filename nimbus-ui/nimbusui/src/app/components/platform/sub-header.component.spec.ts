/**
 * @license
 * Copyright 2016-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { fieldValueParam } from 'mockdata';
import { configureTestSuite } from 'ng-bullet';
import { DateTimeFormatPipe } from '../../pipes/date.pipe';
import { setup } from './../../setup.spec';
import { SubHeaderCmp } from './sub-header.component';

const declarations = [SubHeaderCmp, DateTimeFormatPipe];
const imports = [HttpClientModule, HttpModule];
const providers = [];

let fixture, hostComponent;

describe('SubHeaderCmp', () => {
  configureTestSuite(() => {
    setup(declarations, imports, providers);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderCmp);
    hostComponent = fixture.debugElement.componentInstance;
    hostComponent.element = fieldValueParam;
  });

  it('should create the SubHeaderCmp', async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  // it('ngOnInit() should call loadLabelConfig()',  async(() => {
  //   (hostComponent as any).loadLabelConfig = (a: any) => {    }
  //   const spy = spyOn((hostComponent as any), 'loadLabelConfig').and.callThrough();
  //   hostComponent.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // }));
});
